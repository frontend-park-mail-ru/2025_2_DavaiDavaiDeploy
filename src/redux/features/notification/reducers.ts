import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsNotification } from '../../../types/models';
import actionTypes from './notificationTypes';

interface InitialState {
	error: string | null;
	data: ModelsNotification | null;
	isWSConnected: boolean;
	hasPermission: boolean;
}

/**
 * Начальное состояние редьюсера поиска.
 */
const initialState: InitialState = {
	error: null,
	data: null,
	isWSConnected: false,
	hasPermission: false,
};

/**
 * Редьюсер для управления состоянием поиска.
 */
const searchReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.NOTIFICATION_PERMISSION_DENIED:
			return {
				...state,
				notification: {
					...state.notification,
					error: payload.error,
					data: null,
					hasPermission: false,
				},
			};
		case actionTypes.NOTIFICATION_RECEIVED:
			return {
				...state,
				notification: {
					...state.notification,
					error: null,
					data: payload.notification,
				},
			};
		case actionTypes.WS_CONNECTED:
			return {
				...state,
				notification: {
					...state.notification,
					isWSConnected: true,
				},
			};
		case actionTypes.WS_DISCONNECTED:
			return {
				...state,
				notification: {
					...state.notification,
					isWSConnected: false,
				},
			};
		case actionTypes.NOTIFICATION_PERMISSION_GRANTED:
			return {
				...state,
				notification: {
					...state.notification,
					hasPermission: true,
				},
			};
		case actionTypes.SET_NOTIFICATION_ERROR:
			return {
				...state,
				notification: {
					...state.notification,
					error: payload.error,
				},
			};

		default:
			return state;
	}
};

export default searchReducer;
