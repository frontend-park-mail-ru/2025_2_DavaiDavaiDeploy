import { authorizationCodeToErrorHelper } from '@/helpers/authorizationCodeToErrorHelper/authorizationCodeToErrorHelper.ts';
import { avatarChangeCodeToErrorHelper } from '@/helpers/avatarChangeCodeToErrorHelper/avatarChangeCodeToErrorHelper';
import LocalStorageHelper from '@/helpers/localStorageHelper/localStorageHelper.ts';
import { registrationCodeToErrorHelper } from '@/helpers/registrationCodeToError/registrationCodeToError.ts';
import { storeAuthTokensFromResponse } from '@/helpers/storeAuthTokensFromResponse/storeAuthTokensFromResponse.ts';
import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsUser } from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Создает действие для добавления ошибки двухфакторной аутентификации.

 */
const setOTPError = (err: string): Action => {
	return {
		type: actionTypes.USER_OTP_ERROR,
		payload: {
			error: err,
		},
	};
};

/**
 * Создает действие для деактивации двухфакторной аутентификации.

 */
const setDeactivatedOTP = (): Action => {
	return {
		type: actionTypes.USER_OTP_DEACTIVATE,
	};
};

/**
 * Создает действие для активации двухфакторной аутентификации.

 */
const setActivatedOTP = (qrImage: string | null): Action => {
	return {
		type: actionTypes.USER_OTP_ACTIVATE,
		payload: {
			qrImage,
		},
	};
};

/**
 * Создает действие для активации двухфакторной аутентификации.

 */
const setOTPLoading = (): Action => {
	return {
		type: actionTypes.USER_OTP_LOADING,
	};
};

/**
 * Создает действие для выхода пользователя из системы.

 */
const resetUserError = (): Action => {
	return {
		type: actionTypes.USER_ERROR_RESET,
	};
};

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

		Sentry.captureException(new Error('Ошибка ручки проверки аутентификации'), {
			tags: {
				category: 'check',
			},
			extra: {
				error: errorMessage,
			},
		});
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

			Sentry.captureException(new Error('Ошибка ручки регистрации'), {
				tags: {
					category: 'signup',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

/**
 * Создает асинхронное действие для входа пользователя в систему.
 */
const loginUserAction =
	(login: string, password: string, otp?: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsUser>('/auth/signin', {
				data: otp
					? {
							login: login,
							password: password,
							user_code: otp,
						}
					: {
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

			Sentry.captureException(new Error('Ошибка ручки входа'), {
				tags: {
					category: 'signin',
				},
				extra: {
					error: errorMessage,
				},
			});
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

		Sentry.captureException(new Error('Ошибка ручки выхода'), {
			tags: {
				category: 'logout',
			},
			extra: {
				error: errorMessage,
			},
		});
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
			Sentry.captureException(new Error('Ошибка ручки смены пароля'), {
				tags: {
					category: 'passChange',
				},
				extra: {
					error: errorMessage,
				},
			});
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
			Sentry.captureException(new Error('Ошибка ручки смены аватара'), {
				tags: {
					category: 'avatarChange',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

const sendActivateOTP = (): Action => async (dispatch: Dispatch) => {
	dispatch(setOTPLoading());

	try {
		const response = await HTTPClient.post<Blob>('/auth/enable2fa');
		dispatch(setActivatedOTP(URL.createObjectURL(response.data)));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(setOTPError(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки активации 2FA'), {
			tags: {
				category: 'enable2fa',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

const sendDeactivateOTP = (): Action => async (dispatch: Dispatch) => {
	dispatch(setOTPLoading());

	try {
		await HTTPClient.post<ModelsUser>('/auth/disable2fa');
		dispatch(setDeactivatedOTP());
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = avatarChangeCodeToErrorHelper(error.cause as number);
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(setOTPError(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки деактивации 2FA'), {
			tags: {
				category: 'disable2fa',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

export default {
	resetUserError,
	registerUserAction,
	loginUserAction,
	checkUserAction,
	updateUserAction,
	deleteUserAction,
	logoutUserAction,
	changePasswordAction,
	changeAvatarAction,
	setDeactivatedOTP,
	setActivatedOTP,
	sendActivateOTP,
	sendDeactivateOTP,
	setOTPLoading,
	setOTPError,
};
