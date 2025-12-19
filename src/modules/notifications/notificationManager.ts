const PING_INTERVAL_MS = 30_000;
const WEBSOCKET_URL = 'wss://ddfilms.online/api/films/ws';

interface NotificationData {
	id: string;
	title: string;
	text: string;
	film_id: string;
	scheduled_at: string;
}

export class NotificationManager {
	private static ws: WebSocket | null = null;
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
		this.ws = new WebSocket(WEBSOCKET_URL);

		this.ws.onopen = () => {
			this.startPing();
		};

		this.ws.onmessage = (event: MessageEvent) => {
			const data: NotificationData = JSON.parse(event.data);
			this.showNotification(data);
		};

		this.ws.onclose = () => {
			this.stopPing();
		};
	}

	/**
	 * Проверка на наличие активного соединения WebSocket
	 */
	static hasWSConnection(): boolean {
		return this.ws !== null;
	}

	/**
	 * Показывает уведомление через Service Worker
	 */
	private static async showNotification(data: NotificationData): Promise<void> {
		if (Notification.permission !== 'granted') {
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

		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			await registration.showNotification(data.title, options);
		} else {
			new Notification(data.title, options);
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
			this.stopPing();
			this.ws.close(1000, 'Client disconnect');
			this.ws = null;
		}
	}
}
