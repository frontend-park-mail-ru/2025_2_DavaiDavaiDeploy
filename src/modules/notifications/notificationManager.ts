const RECONNECT_INTERVAL_MS = 60_000;
const PING_INTERVAL_MS = 30_000;
const MAX_RECONNECT_ATTEMPTS = 5;
const WEB_SOCKET_URL = 'wss://ddfilms.online/api/films/ws';

export class NotificationManager {
	private static subscription: PushSubscription | null = null;
	private static ws: WebSocket | null = null;
	private static reconnectAttempts = 0;
	private static pingInterval: ReturnType<typeof setInterval> | null = null;

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
	 * Подключается к WebSocket для получения уведомлений
	 */
	static connectWebSocket(
		onMessage: (data: {
			id: string;
			title: string;
			text: string;
			created_at: string;
		}) => void,
	): void {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			return;
		}

		if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
			return;
		}

		this.ws = new WebSocket(WEB_SOCKET_URL);

		this.ws.onopen = () => {
			this.reconnectAttempts = 0;
			this.startPing();
		};

		this.ws.onmessage = (event) => {
			if (event.data === 'pong') {
				return;
			}

			try {
				const data = JSON.parse(event.data);
				onMessage(data);
			} catch {
				// Ignore parsing errors
			}
		};

		this.ws.onerror = (error) => {
			// eslint-disable-next-line no-console
			console.error('[WS] Error:', error);
		};

		this.ws.onclose = () => {
			this.stopPing();
			this.reconnectAttempts++;
			setTimeout(() => this.connectWebSocket(onMessage), RECONNECT_INTERVAL_MS);
		};
	}

	/**
	 * Запускает периодическую отправку ping-сообщений
	 */
	private static startPing(): void {
		this.stopPing();

		this.pingInterval = setInterval(() => {
			if (this.ws && this.ws.readyState === WebSocket.OPEN) {
				this.ws.send('ping');
			} else {
				this.stopPing();
			}
		}, PING_INTERVAL_MS);
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
	 * Показывает нативное уведомление
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

		if (!this.isPushSupported() || document.visibilityState === 'visible') {
			new Notification(title, {
				icon: `${cdnAddress}/static/favicon/favicon-86x86.png`,
				badge: `${cdnAddress}/static/favicon/favicon-32x32.png`,
				...options,
			});
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

	/**
	 * Отключается от WebSocket
	 */
	static disconnect(): void {
		if (this.ws) {
			this.stopPing();
			this.ws.close(1000, 'Client disconnect');
			this.ws = null;
			this.reconnectAttempts = 0;
		}
	}
}
