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
 * Запрашивает разрешение на уведомления
 */
const requestNotificationPermission =
	(): Action => async (dispatch: Dispatch) => {
		try {
			// ✅ Проверяем, не заблокированы ли уведомления
			if (Notification.permission === 'denied') {
				console.warn('[Notifications] Permission denied by user');
				dispatch(notificationDenyAction());
				return;
			}

			// ✅ Если уже разрешено - пропускаем запрос
			if (Notification.permission === 'granted') {
				console.log('[Notifications] Permission already granted');
				dispatch(notificationGrantedAction());
				return;
			}

			// ✅ Запрашиваем разрешение
			const permission = await NotificationManager.requestPermission();

			if (permission === 'granted') {
				dispatch(notificationGrantedAction());
			} else {
				dispatch(notificationDenyAction());
			}
		} catch (error) {
			console.error('[Notifications] Failed to request permission:', error);
			dispatch(notificationDenyAction());
		}
	};

/**
 * Запускает показ тестовых уведомлений каждые 10 секунд
 */
const connectToNotifications = (): Action => (dispatch: Dispatch) => {
	console.log('[Notifications] Starting notification loop');
	NotificationManager.startNotifications();
	dispatch(notificationWebSocketConnectedAction());
};

/**
 * Останавливает показ уведомлений
 */
const disconnectFromNotifications = (): Action => (dispatch: Dispatch) => {
	console.log('[Notifications] Stopping notification loop');
	NotificationManager.stopNotifications();
	dispatch(notificationWebSocketDisconnectedAction());
};

export default {
	setNotificationErrorAction,
	requestNotificationPermission,
	connectToNotifications,
	disconnectFromNotifications,
};
