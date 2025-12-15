import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsOTPUser, ModelsUser } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	user: (ModelsUser & ModelsOTPUser) | null;
	error: string | null;
	passwordChangeError: string | null;
	avatarChangeError: boolean;
	newPasswordLoading: boolean;
	newAvatarLoading: boolean;
	isChecked: boolean;
	vkidError: string | null;
	VKIDAuthentificated: boolean;
}

/**
 * Начальное состояние редьюсера пользователей.
 * @property {Array<Object>} user - Список пользователей.
 */
const initialState: InitialState = {
	loading: false,
	user: null,
	error: null,
	passwordChangeError: null,
	avatarChangeError: false,
	newPasswordLoading: false,
	newAvatarLoading: false,
	isChecked: false,
	vkidError: null,
	VKIDAuthentificated: false,
};

/**
 * Редьюсер пользователей для обработки действий create, update и delete.
 */
export const userReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.USER_CREATE:
		case actionTypes.USER_LOADED:
			return {
				...state,
				loading: false,
				user: payload.user,
				VKIDAuthentificated: payload.user.is_foreign,
			};
		case actionTypes.USER_UPDATE:
			return {
				...state,
				loading: false,
				user: state.user.map((user: ModelsUser) =>
					user.id === payload.user.id ? payload.user : user,
				),
			};
		case actionTypes.USER_DELETE:
			return {
				...state,
				loading: false,
				user: state.user.filter(
					(user: ModelsUser) => user.id !== payload.userId,
				),
			};
		case actionTypes.USER_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};

		case actionTypes.USER_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				user: null,
			};
		case actionTypes.USER_LOGOUT:
			return {
				...state,
				loading: false,
				user: null,
			};

		case actionTypes.PASSWORD_CHANGE_LOADING:
			return {
				...state,
				passwordChangeError: null,
				newPasswordLoading: true,
			};

		case actionTypes.PASSWORD_CHANGE_LOAD:
			return {
				...state,
				passwordChangeError: null,
				newPasswordLoading: false,
				user: payload.user,
			};

		case actionTypes.PASSWORD_CHANGE_ERROR:
			return {
				...state,
				newPasswordLoading: false,
				passwordChangeError: payload.error,
			};

		case actionTypes.AVATAR_CHANGE_LOADING:
			return {
				...state,
				avatarChangeError: null,
				newAvatarLoading: true,
			};

		case actionTypes.AVATAR_CHANGE_ERROR:
			return {
				...state,
				newAvatarLoading: false,
				avatarChangeError: payload.error,
			};

		case actionTypes.AVATAR_CHANGE_LOAD:
			return {
				...state,
				newAvatarLoading: false,
				avatarChangeError: null,
				user: payload.user,
			};
		case actionTypes.USER_ERROR_RESET:
			return {
				...state,
				error: null,
			};

		case actionTypes.USER_OTP_DEACTIVATE:
			return {
				...state,
				user: {
					...state.user,
					has_2fa: false,
					twoFactorLoading: false,
					qrCode: null,
					error: null,
				},
			};
		case actionTypes.USER_OTP_ACTIVATE:
			return {
				...state,
				user: {
					...state.user,
					has_2fa: true,
					twoFactorLoading: false,
					error: null,
					qrCode: payload.qrImage,
				},
			};
		case actionTypes.USER_OTP_LOADING:
			return {
				...state,
				user: {
					...state.user,
					error: null,
					twoFactorLoading: true,
				},
			};

		case actionTypes.USER_OTP_ERROR:
			return {
				...state,
				user: {
					...state.user,
					error: payload.error,
					twoFactorLoading: false,
				},
			};

		case actionTypes.USER_CHECKED:
			return {
				...state,
				isChecked: true,
			};
		case actionTypes.VKID_USER_LOADED:
			return {
				...state,
				user: {
					...state.user,
					...payload.user,
				},
				VKIDAuthentificated: true,
				vkidError: null,
			};
		case actionTypes.VKID_USER_ERROR:
			return {
				...state,
				user: {
					...state.user,
				},
				vkidError: payload.error,
				VKIDAuthentificated: false,
			};

		case actionTypes.VKID_USER_ERROR_CLEAR:
			return {
				...state,
				user: {
					...state.user,
				},
				vkidError: null,
			};
		default:
			return state;
	}
};

export default userReducer;
