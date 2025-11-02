import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsUser } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	user: ModelsUser | null;
	error: string | null;
}

/**
 * Начальное состояние редьюсера пользователей.
 * @property {Array<Object>} user - Список пользователей.
 */
const initialState: InitialState = {
	loading: false,
	user: null,
	error: null,
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
			return { ...state, loading: true, error: null };
		case actionTypes.USER_LOADED:
			return { ...state, loading: false, user: action.payload.user };
		case actionTypes.USER_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				user: null,
			};
		case actionTypes.USER_LOGOUT:
			return {
				...state,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
};

export default userReducer;
