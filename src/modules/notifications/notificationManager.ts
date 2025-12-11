const NOTIFICATION_INTERVAL_MS = 10_000; // ✅ Уведомления каждые 10 секунд

export class NotificationManager {
	private static subscription: PushSubscription | null = null; // ✅ Для Push API
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
