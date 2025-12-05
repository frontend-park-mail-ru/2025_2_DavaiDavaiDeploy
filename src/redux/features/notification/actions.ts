import { NotificationManager } from '@/modules/notifications/notificationManager';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsNotification } from '../../../types/models';
import actionTypes from './notificationTypes';

const ALLOWENCE_ERROR_MESSAGE = 'Произошла ошибка при получении разрешения';

/**
 * Action: Ошибка при получении разрешения на показ уведомлений
 */
const setNotificationErrorAction = (error: string): Action => {
	return {
		type: actionTypes.SET_NOTIFICATION_ERROR,
		payload: { error },
	};
};

/**
 * Action: Отказано в получении разрешения на показ уведомлений
 */
const notificationDenyAction = (): Action => {
	return {
		type: actionTypes.NOTIFICATION_PERMISSION_DENIED,
		payload: { error: ALLOWENCE_ERROR_MESSAGE },
	};
};

/**
 * Action: Разрешение на показ уведомлений
 */
const notificationGrantedAction = (): Action => {
	return {
		type: actionTypes.NOTIFICATION_PERMISSION_GRANTED,
	};
};

/**
 * Action: Получено уведомление
 */
const notificationReceivedAction = (data: ModelsNotification): Action => {
	return {
		type: actionTypes.NOTIFICATION_RECEIVED,
		payload: { notification: data },
	};
};

/**
 * Action: соединение WebSocket установлено
 */
const notificationWebSocketConnectedAction = (): Action => {
	return {
		type: actionTypes.WS_CONNECTED,
	};
};

/**
 * Action: соединение WebSocket разорвано
 */
const notificationWebSocketDisconnectedAction = (): Action => {
	return {
		type: actionTypes.WS_DISCONNECTED,
	};
};

/**
 * Запрашивает разрешение на уведомления и подписывается на Push
 */
const requestNotificationPermission =
	(): Action => async (dispatch: Dispatch) => {
		try {
			const permission = await NotificationManager.requestPermission();

			if (permission === 'granted') {
				dispatch(notificationGrantedAction());

				if (NotificationManager.isPushSupported()) {
					const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
					const subscription =
						await NotificationManager.subscribeToPush(VAPID_PUBLIC_KEY);

					await NotificationManager.sendSubscriptionToServer(subscription);
				}
			} else {
				dispatch(notificationDenyAction());
			}
		} catch {
			dispatch(notificationDenyAction());
		}
	};

/**
 * Подключается к WebSocket для получения уведомлений
 */
const connectToNotifications = (): Action => (dispatch: Dispatch) => {
	NotificationManager.connectWebSocket((data: ModelsNotification) => {
		dispatch(notificationReceivedAction(data));

		if (document.visibilityState === 'visible') {
			NotificationManager.showNotification(data.title, {
				body: data.text,
				tag: data.id,
			});
		}
	});

	dispatch(notificationWebSocketConnectedAction());
};

/**
 * Отключается от WebSocket
 */
const disconnectFromNotifications = (): Action => (dispatch: Dispatch) => {
	NotificationManager.disconnect();
	dispatch(notificationWebSocketDisconnectedAction());
};

export default {
	setNotificationErrorAction,
	requestNotificationPermission,
	connectToNotifications,
	disconnectFromNotifications,
};
