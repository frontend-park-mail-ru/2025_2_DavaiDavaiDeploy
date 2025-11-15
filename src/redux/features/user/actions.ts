import { authorizationCodeToErrorHelper } from '@/helpers/authorizationCodeToErrorHelper/authorizationCodeToErrorHelper.ts';
import { avatarChangeCodeToErrorHelper } from '@/helpers/avatarChangeCodeToErrorHelper/avatarChangeCodeToErrorHelper';
import LocalStorageHelper from '@/helpers/localStorageHelper/localStorageHelper.ts';
import { registrationCodeToErrorHelper } from '@/helpers/registrationCodeToError/registrationCodeToError.ts';
import { storeAuthTokensFromResponse } from '@/helpers/storeAuthTokensFromResponse/storeAuthTokensFromResponse.ts';
import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import { type ModelsUser, type Stats, type TechResponse } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Создает действие для выхода пользователя из системы.

 */
const setUserLogoutAction = (): Action => {
	return {
		type: actionTypes.USER_LOGOUT,
	};
};

/**
 * Создает действие для установки состояния загрузки пользователя.

 */
const setUserLoadingAction = (): Action => {
	return {
		type: actionTypes.USER_LOADING,
	};
};

const setNewPasswordLoadingAction = (): Action => {
	return {
		type: actionTypes.PASSWORD_CHANGE_LOADING,
	};
};

const setNewAvatarLoadingAction = (): Action => {
	return {
		type: actionTypes.AVATAR_CHANGE_LOADING,
	};
};

const setStatsLoadingAction = (): Action => {
	return {
		type: actionTypes.STATS_LOADING,
	};
};

/**
 * Создает действие для успешной загрузки данных пользователя.
 * @function
 */
const returnUserAction = (data: ModelsUser): Action => {
	return {
		type: actionTypes.USER_LOADED,
		payload: { user: data, error: null },
	};
};

const returnChangeAvatarAction = (data: ModelsUser): Action => {
	return {
		type: actionTypes.AVATAR_CHANGE_LOAD,
		payload: { user: data },
	};
};

const returnChangePasswordAction = (data: ModelsUser): Action => {
	return {
		type: actionTypes.PASSWORD_CHANGE_LOAD,
		payload: { user: data },
	};
};

/**
 * Создает действие для обработки ошибки загрузки пользователя.
 */
const returnUserErrorAction = (error: string): Action => {
	return {
		type: actionTypes.USER_ERROR,
		payload: { user: null, error: error },
	};
};

const returnPasswordChangeErrorAction = (error: string | null): Action => {
	return {
		type: actionTypes.PASSWORD_CHANGE_ERROR,
		payload: { error: error },
	};
};

const returnAvatarChangeErrorAction = (error: string): Action => {
	return {
		type: actionTypes.AVATAR_CHANGE_ERROR,
		payload: { error: error },
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

const returnMyRequestsAction = (data: TechResponse[]): Action => {
	return {
		type: actionTypes.MY_REQUESTS_LOADED,
		payload: { tech_requests: data },
	};
};

const returnMyRequestsActionError = (error: string): Action => {
	return {
		type: actionTypes.MY_REQUESTS_ERROR,
		payload: { error: error },
	};
};

const returnStatsAction = (data: Stats): Action => {
	return {
		type: actionTypes.STATS_LOAD,
		payload: { stats: data },
	};
};

const returnStatsActionError = (error: string): Action => {
	return {
		type: actionTypes.STATS_ERROR,
		payload: { error: error },
	};
};

/**
 * Создает асинхронное действие для проверки авторизации пользователя.
 */
const checkUserAction = (): Action => async (dispatch: Dispatch) => {
	if (
		window.location.pathname === '/login' ||
		window.location.pathname === '/register'
	) {
		return;
	}

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

			storeAuthTokensFromResponse(response);
			dispatch(returnUserAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = registrationCodeToErrorHelper(error.cause as number);
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

			storeAuthTokensFromResponse(response);
			dispatch(returnUserAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = authorizationCodeToErrorHelper(error.cause as number);
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnUserErrorAction(errorMessage));
		}
	};

const logoutUserAction = () => async (dispatch: Dispatch) => {
	try {
		await HTTPClient.post<ModelsUser>('/auth/logout');
		dispatch(setUserLogoutAction());
		LocalStorageHelper.removeItem('x-csrf-token');
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

const changePasswordAction =
	(old_password: string, new_password: string): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setNewPasswordLoadingAction());

		try {
			const response = await HTTPClient.put<ModelsUser>(
				'/users/change/password',
				{
					data: {
						new_password,
						old_password,
					},
				},
			);

			storeAuthTokensFromResponse(response);
			dispatch(returnChangePasswordAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnPasswordChangeErrorAction(errorMessage));
		}
	};

const changeAvatarAction =
	(file: File): Action =>
	async (dispatch: Dispatch) => {
		const formData = new FormData();
		formData.append('avatar', file);

		dispatch(setNewAvatarLoadingAction());

		try {
			const response = await HTTPClient.put<ModelsUser>(
				'/users/change/avatar',
				{
					data: formData,
				},
			);

			storeAuthTokensFromResponse(response);
			dispatch(returnChangeAvatarAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = avatarChangeCodeToErrorHelper(error.cause as number);
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnAvatarChangeErrorAction(errorMessage));
		}
	};

const getMyRequests: Action = () => async (dispatch: Dispatch) => {
	try {
		const response = await HTTPClient.get<TechResponse[]>('/feedback/my');
		dispatch(returnMyRequestsAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnMyRequestsActionError(errorMessage));
	}
};

const getAllRequests: Action = () => async (dispatch: Dispatch) => {
	try {
		const response = await HTTPClient.get<TechResponse[]>('/feedback');
		dispatch(returnMyRequestsAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnMyRequestsActionError(errorMessage));
	}
};

const getMyStats: Action = (isAdmin: boolean) => async (dispatch: Dispatch) => {
	console.log('в актион');
	dispatch(setStatsLoadingAction());

	let path = '/feedback/my/stats';

	if (isAdmin) {
		path = '/feedback/stats';
	}

	try {
		const response = await HTTPClient.get<Stats>(path);

		console.log(response.data);

		dispatch(returnStatsAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnStatsActionError(errorMessage));
	}
};

export default {
	registerUserAction,
	loginUserAction,
	checkUserAction,
	updateUserAction,
	deleteUserAction,
	logoutUserAction,
	changePasswordAction,
	changeAvatarAction,
	getMyStats,
	getMyRequests,
	getAllRequests,
};
