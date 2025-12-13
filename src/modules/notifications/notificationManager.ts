const NOTIFICATION_INTERVAL_MS = 10_000; // ✅ Для тестовых уведомлений
const RECONNECT_INTERVAL_MS = 5_000;
const PING_INTERVAL_MS = 30_000; // ✅ Пинг каждые 30 секунд
const MAX_RECONNECT_ATTEMPTS = 10;

// ✅ Определяем WebSocket URL в зависимости от окружения
const getWebSocketURL = (): string => {
	// Для production используем полный URL
	if (window.location.host === 'ddfilms.online') {
		return 'wss://ddfilms.online/api/films/ws';
	}

	// Для localhost используем относительный путь (через Vite прокси)
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'wss:';
	const host = window.location.host;
	return `${protocol}//${host}/api/films/ws`;
};

const WEB_SOCKET_URL = getWebSocketURL();

export class NotificationManager {
	private static subscription: PushSubscription | null = null;
	private static ws: WebSocket | null = null;
	private static reconnectAttempts = 0;
	private static pingInterval: ReturnType<typeof setInterval> | null = null;
	private static isConnecting = false;
	private static notificationInterval: ReturnType<typeof setInterval> | null =
		null;
	private static notificationCount = 0;

	/**
	 * Проверяет поддержку уведомлений в браузере
	 */
	static isSupported(): boolean {
		return 'Notification' in window && 'serviceWorker' in navigator;
	}

	/**
	 * Проверяет поддержку Push API (для мобильных)
	 */
	static isPushSupported(): boolean {
		return 'PushManager' in window;
	}

	/**
	 * Запрашивает разрешение на уведомления
	 */
	static async requestPermission(): Promise<NotificationPermission> {
		return new Promise((resolve, reject) => {
			const permissionResult = Notification.requestPermission((result) => {
				resolve(result);
			});

			if (permissionResult) {
				permissionResult.then(resolve, reject);
			}
		});
	}

	/**
	 * Регистрирует сервис-воркер и подписывается на Push-уведомления
	 */
	static async subscribeToPush(
		vapidPublicKey: string,
	): Promise<PushSubscription> {
		const registration = await navigator.serviceWorker.register('/sw.js'); // ✅ Исправлен путь
		await navigator.serviceWorker.ready;

		const subscribeOptions: PushSubscriptionOptionsInit = {
			userVisibleOnly: true,
			applicationServerKey: this.urlBase64ToUint8Array(
				vapidPublicKey,
			) as BufferSource, // ✅ Явное приведение типа
		};

		this.subscription =
			await registration.pushManager.subscribe(subscribeOptions);

		return this.subscription;
	}

	/**
	 * Отправляет подписку на сервер
	 */
	static async sendSubscriptionToServer(
		subscription: PushSubscription,
	): Promise<void> {
		const response = await fetch('/api/push/subscribe', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(subscription),
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Failed to send subscription to server');
		}
	}

	/**
	 * Запускает показ тестовых уведомлений каждые 10 секунд
	 */
	static async startNotifications(): Promise<void> {
		// Останавливаем предыдущий интервал, если был
		this.stopNotifications();

		// ✅ Регистрируем Service Worker перед началом
		if ('serviceWorker' in navigator) {
			try {
				await navigator.serviceWorker.register('/sw.js');
				await navigator.serviceWorker.ready;
				console.log('[Notifications] Service Worker registered');
			} catch (error) {
				console.error(
					'[Notifications] Service Worker registration failed:',
					error,
				);
			}
		}

		this.notificationInterval = setInterval(() => {
			this.notificationCount++;

			this.showNotification(`Уведомление #${this.notificationCount}`, {
				body: `Это тестовое уведомление. Время: ${new Date().toLocaleTimeString()}`,
				tag: `notification-${this.notificationCount}`,
			});
		}, NOTIFICATION_INTERVAL_MS);

		console.log(
			'[Notifications] Started showing notifications every 10 seconds',
		);
	}

	/**
	 * Останавливает показ уведомлений
	 */
	static stopNotifications(): void {
		if (this.notificationInterval) {
			clearInterval(this.notificationInterval);
			this.notificationInterval = null;
			console.log('[Notifications] Stopped');
		}
	}

	/**
	 * Подключается к WebSocket для получения уведомлений
	 */
	static connectWebSocket(onMessage: (data: any) => void): void {
		console.log('[WS] 🔌 connectWebSocket called');
		console.log('[WS] Current state:', {
			isConnecting: this.isConnecting,
			hasWebSocket: !!this.ws,
			readyState: this.ws?.readyState,
			reconnectAttempts: this.reconnectAttempts,
		});

		if (this.isConnecting) {
			console.log('[WS] ⚠️ Connection already in progress, skipping');
			return;
		}

		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			console.log('[WS] ✅ Already connected, skipping');
			return;
		}

		if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
			console.error('[WS] ❌ Max reconnection attempts reached');
			return;
		}

		try {
			this.isConnecting = true;
			console.log('[WS] 🚀 Starting connection to:', WEB_SOCKET_URL);
			console.log(
				'[WS] Attempt:',
				this.reconnectAttempts + 1,
				'/',
				MAX_RECONNECT_ATTEMPTS,
			);
			console.log('[WS] Origin:', window.location.origin);
			console.log('[WS] Has cookies:', !!document.cookie);

			// ✅ WebSocket автоматически отправляет cookies для same-origin (DDFilmsCSRF, DDFilmsJWT)
			this.ws = new WebSocket(WEB_SOCKET_URL);

			console.log('[WS] WebSocket object created');
			console.log(
				'[WS] Initial readyState:',
				this.ws.readyState,
				'(0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED)',
			);
			console.log('[WS] URL:', this.ws.url);
			console.log('[WS] Protocol:', this.ws.protocol);

			this.ws.onopen = () => {
				console.log('[WS] ✅ Connected successfully!');
				console.log('[WS] ReadyState:', this.ws?.readyState);
				this.isConnecting = false;
				this.reconnectAttempts = 0;
				this.startPing();
			};

			this.ws.onmessage = (event) => {
				console.log('[WS] ⬇️ RAW MESSAGE:', event.data);
				console.log('[WS] Message type:', typeof event.data);
				console.log('[WS] Message length:', event.data?.length);

				// Игнорируем служебные текстовые сообщения
				if (event.data === 'pong' || event.data === 'connected') {
					console.log('[WS] 💬 Service message (text):', event.data);
					return;
				}

				// Пытаемся распарсить JSON
				try {
					const data = JSON.parse(event.data);
					console.log('[WS] ✅ Parsed JSON:', data);
					console.log('[WS] Message keys:', Object.keys(data));

					// Игнорируем служебные JSON сообщения
					if (
						data.type &&
						['ping', 'pong', 'connected', 'auth', 'authenticated'].includes(
							data.type,
						)
					) {
						console.log('[WS] 💬 Service message (JSON type):', data.type);
						return;
					}

					console.log('[WS] 🔔 NOTIFICATION MESSAGE:', data);

					// Показываем уведомление
					if (data.title && data.text) {
						this.showNotification(data.title, {
							body: data.text,
							tag: data.id,
							data: data.film_id ? { url: `/film/${data.film_id}` } : undefined,
						});
						console.log('[WS] ✅ Notification displayed');
					} else {
						console.warn('[WS] ⚠️ Message missing title or text:', data);
					}

					// Вызываем callback
					onMessage(data);
					console.log('[WS] ✅ Callback executed');
				} catch (error) {
					console.error('[WS] ❌ JSON parse error:', error);
					console.error('[WS] Raw data:', event.data);
				}
			};

			this.ws.onerror = (error) => {
				console.error('[WS] ❌ Connection error:', error);
				console.error('[WS] ReadyState on error:', this.ws?.readyState);
				this.isConnecting = false;
			};

			this.ws.onclose = (event) => {
				console.log('[WS] ⚠️ Connection closed', {
					code: event.code,
					reason: event.reason || '(no reason provided)',
					wasClean: event.wasClean,
				});
				console.log(
					'[WS] Close code meanings: 1000=Normal, 1006=Abnormal, 1011=Server error',
				);

				this.isConnecting = false;
				this.stopPing();
				this.reconnectAttempts++;

				const delay = Math.min(
					RECONNECT_INTERVAL_MS * Math.pow(2, this.reconnectAttempts - 1),
					30_000,
				);

				console.log(
					`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`,
				);

				setTimeout(() => this.connectWebSocket(onMessage), delay);
			};
		} catch (error) {
			console.error('[WS] Failed to create WebSocket:', error);
			this.isConnecting = false;
			this.reconnectAttempts++;

			const delay = Math.min(
				RECONNECT_INTERVAL_MS * Math.pow(2, this.reconnectAttempts - 1),
				30_000,
			);

			setTimeout(() => this.connectWebSocket(onMessage), delay);
		}
	}

	/**
	 * Запускает периодическую отправку ping-сообщений
	 */
	private static startPing(): void {
		this.stopPing();

		console.log('[WS] 🔄 Starting ping interval (every 30s)');

		this.pingInterval = setInterval(() => {
			if (this.ws && this.ws.readyState === WebSocket.OPEN) {
				console.log('[WS] ⬆️ Sending ping...');
				try {
					this.ws.send('ping');
					console.log('[WS] ✅ Ping sent successfully');
				} catch (error) {
					console.error('[WS] ❌ Failed to send ping:', error);
				}
			} else {
				console.warn(
					'[WS] ⚠️ Cannot send ping - connection not open, readyState:',
					this.ws?.readyState,
				);
				this.stopPing();
			}
		}, PING_INTERVAL_MS);

		console.log('[WS] ✅ Ping interval started');
	}

	/**
	 * Останавливает отправку ping-сообщений
	 */
	private static stopPing(): void {
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}
	}

	/**
	 * Отключается от WebSocket
	 */
	static disconnect(): void {
		if (this.ws) {
			console.log('[WS] Closing connection');
			this.stopPing();
			this.isConnecting = false;
			this.ws.close(1000, 'Client disconnect');
			this.ws = null;
			this.reconnectAttempts = 0;
		}
	}

	/**
	 * Показывает нативное уведомление (работает на ПК и мобильных)
	 */
	static async showNotification(
		title: string,
		options?: NotificationOptions,
	): Promise<void> {
		if (Notification.permission !== 'granted') {
			const permission = await this.requestPermission();

			if (permission !== 'granted') {
				throw new Error('Permission denied');
			}
		}

		const cdnAddress = import.meta.env.VITE_CDN_ADDRESS;

		const notificationOptions: NotificationOptions = {
			icon: `${cdnAddress}/static/favicon/favicon-86x86.png`,
			badge: `${cdnAddress}/static/favicon/favicon-32x32.png`,
			requireInteraction: false,
			...options,
		};

		// ✅ Используем Service Worker для показа уведомлений (работает на мобильных)
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.ready;
				await registration.showNotification(title, notificationOptions);
				console.log('[Notifications] Shown via Service Worker');
			} catch (error) {
				console.error('[Notifications] Service Worker failed:', error);
				// ✅ Fallback на обычные уведомления (только для ПК)
				new Notification(title, notificationOptions);
			}
		} else {
			// ✅ Fallback для браузеров без Service Worker
			new Notification(title, notificationOptions);
		}
	}

	/**
	 * Конвертирует VAPID ключ из Base64 в Uint8Array
	 */
	private static urlBase64ToUint8Array(base64String: string): Uint8Array {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding)
			.replace(/-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}

		return outputArray;
	}
}
