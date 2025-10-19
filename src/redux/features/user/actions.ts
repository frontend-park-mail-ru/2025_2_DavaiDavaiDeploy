import type { ModelsUser } from '@/modules/HTTPClient/types/api';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import HTTPClient from '../../../modules/HTTPClient/index';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Создает действие для установки состояния загрузки пользователя.

 */
const setUserLoadingAction = (): Action => {
	return {
		type: actionTypes.USER_LOADING,
	};
};

/**
 * Создает действие для успешной загрузки данных пользователя.
 * @function
 */
const returnUserAction = (data: ModelsUser): Action => {
	return {
		type: actionTypes.USER_LOADED,
		payload: { users: data },
	};
};

/**
 * Создает действие для обработки ошибки загрузки пользователя.
 */
const returnUserErrorAction = (error: string): Action => {
	return {
		type: actionTypes.USER_ERROR,
		payload: { users: [], error: error },
	};
};

/**
 * Создает действие для обновления существующего пользователя.
 */
const updateUserAction = (login: string, password: string): Action => {
	return {
		type: actionTypes.USER_UPDATE,
		payload: { login: login, password: password },
	};
};

/**
 * Создает действие для удаления пользователя по его идентификатору.
 */
const deleteUserAction = (userId: string | number): Action => {
	return {
		type: actionTypes.USER_DELETE,
		payload: { userId: userId },
	};
};

/**
 * Создает асинхронное действие для проверки авторизации пользователя.
 */
const checkUserAction = (): Action => async (dispatch: Dispatch) => {
	dispatch(setUserLoadingAction());
	try {
		const response = await HTTPClient.get<ModelsUser>('/auth/check');
		dispatch(returnUserAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnUserErrorAction(errorMessage));
	}
};

/**
 * Создает действие для добавления нового пользователя.
 */

/**
 * Создает асинхронное действие для регистрации нового пользователя.
 */
const registerUserAction =
	(login: string, password: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsUser>('/auth/signup', {
				data: {
					login: login,
					password: password,
				},
			});
			dispatch(returnUserAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnUserErrorAction(errorMessage));
		}
	};

/**
 * Создает асинхронное действие для входа пользователя в систему.
 */
const loginUserAction =
	(login: string, password: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsUser>('/auth/signin', {
				data: {
					login: login,
					password: password,
				},
			});
			dispatch(returnUserAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnUserErrorAction(errorMessage));
		}
	};

export default {
	registerUserAction,
	loginUserAction,
	checkUserAction,
	updateUserAction,
	deleteUserAction,
};
