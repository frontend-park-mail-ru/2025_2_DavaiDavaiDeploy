const PING_INTERVAL_MS = 30_000;
const WEBSOCKET_URL = 'wss://ddfilms.online/api/films/ws';

interface NotificationData {
	id: string;
	title: string;
	text: string;
	film_id: string;
	scheduled_at: string;
}

interface NotificationNotSecuredPassword {
	text: string;
}

const NOT_SECURED_PASSWORD_TEXT = 'Password found';

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
	 * Вызывает уведомление с нужнми параметрами
	 */
	static async notificationReducer(event: MessageEvent) {
		const data = JSON.parse(event.data);

		if (data?.text && data?.text === NOT_SECURED_PASSWORD_TEXT) {
			this.showNotification(
				data as NotificationNotSecuredPassword,
				'Пароль не безопасен, пожалуйста, смените его',
			);

			return;
		}

		this.showNotification(data as NotificationData, data.title);
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
			this.notificationReducer(event);
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
	private static async showNotification(
		data: NotificationData | NotificationNotSecuredPassword,
		title: string,
	): Promise<void> {
		if (Notification.permission !== 'granted') {
			return;
		}

		const cdnAddress = import.meta.env.VITE_CDN_ADDRESS || '';
		const iconUrl = `${cdnAddress}/static/favicon/favicon-86x86.png`;

		const options: NotificationOptions = {
			body: data.text,
			icon: iconUrl,
			badge: iconUrl,
			tag: 'id' in data ? data.id : '1252',
			data: {
				url: 'film_id' in data ? `/films/${data.film_id}` : '/',
			},
			requireInteraction: false,
		};

		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.ready;
			await registration.showNotification(title, options);
		} else {
			new Notification(title, options);
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
