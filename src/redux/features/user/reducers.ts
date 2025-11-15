import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsUser } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	user: ModelsUser | null;
	error: string | null;
	passwordChangeError: string | null;
	avatarChangeError: boolean;
	newPasswordLoading: boolean;
	newAvatarLoading: false;
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

		default:
			return state;
	}
};

export default userReducer;
