/* eslint-disable */

// const RECONNECT_INTERVAL_MS = 5_000;
const PING_INTERVAL_MS = 30_000;
// const MAX_RECONNECT_ATTEMPTS = 10;
// const WEB_SOCKET_URL = 'wss://ddfilms.online/api/films/ws';

interface NotificationData {
	id: string;
	title: string;
	text: string;
	film_id: string;
	scheduled_at: string;
}

export class NotificationManager {
	private static ws: WebSocket | null = null;
	// private static reconnectAttempts = 0;
	private static pingInterval: ReturnType<typeof setInterval> | null = null;

	/**
	 * Проверяет поддержку уведомлений в браузере
	 */
	static isSupported(): boolean {
		return 'Notification' in window && 'serviceWorker' in navigator;
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
	 * Подключается к WebSocket для получения уведомлений
	 */
	static connect(): void {
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const host = window.location.host;
		const wsUrl = `${protocol}//${host}/api/films/ws`;

		console.log('[WS] Connecting to:', wsUrl);

		this.ws = new WebSocket(wsUrl);

		this.ws.onopen = () => {
			console.log('[WS] ✅ Connected!');
			// this.reconnectAttempts = 0;
			this.startPing();
		};

		this.ws.onmessage = (event: MessageEvent) => {
			const data: NotificationData = JSON.parse(event.data);

			console.log('[WS] 🔔 Notification received:', data);

			this.showNotification(data);
		};

		this.ws.onerror = (error) => {
			console.error('[WS] Error:', error);
		};

		this.ws.onclose = (event) => {
			console.log('[WS] Closed:', event.code, event.reason);
			this.stopPing();
			// this.reconnectAttempts++;

			// console.log(`[WS] Reconnecting in ${delay}ms...`);
			// setTimeout(() => this.connect(), delay);
		};
	}

	/**
	 * Показывает уведомление через Service Worker
	 */
	private static async showNotification(data: NotificationData): Promise<void> {
		if (Notification.permission !== 'granted') {
			console.warn('[Notifications] Permission not granted');
			return;
		}

		const cdnAddress = import.meta.env.VITE_CDN_ADDRESS || '';
		const iconUrl = `${cdnAddress}/static/favicon/favicon-86x86.png`;

		const options: NotificationOptions = {
			body: data.text,
			icon: iconUrl,
			badge: iconUrl,
			tag: data.id,
			data: {
				url: `/films/${data.film_id}`,
			},
			requireInteraction: false,
		};

		try {
			if ('serviceWorker' in navigator) {
				const registration = await navigator.serviceWorker.ready;
				await registration.showNotification(data.title, options);
				console.log('[Notifications] Shown via Service Worker');
			} else {
				new Notification(data.title, options);
			}
		} catch (error) {
			console.error('[Notifications] Failed to show:', error);
		}
	}

	/**
	 * Запускает периодическую отправку ping
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
	 * Останавливает ping
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
			console.log('[WS] Disconnecting...');
			this.stopPing();
			this.ws.close(1000, 'Client disconnect');
			this.ws = null;
		}
	}
}
