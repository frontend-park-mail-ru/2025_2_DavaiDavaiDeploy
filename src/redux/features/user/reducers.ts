import type { ModelsUser } from '@/modules/HTTPClient/types/api'
import type { Action } from '@/modules/redux/types/actions'
import type { Reducer } from '@/modules/redux/types/reducers'
import type { State } from '@/modules/redux/types/store'
import actionTypes from './actionTypes'

/**
 * Начальное состояние редьюсера пользователей.
 * @type {Object}
 * @property {Array<Object>} users - Список пользователей.
 */
const initialState: State = {
	users: [] as ModelsUser[],
}

/**
 * Редьюсер пользователей для обработки действий create, update и delete.
 */
export const userReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state
	}
	const { type, payload } = action

	switch (type) {
		case actionTypes.USER_CREATE:
			return {
				...state,
				users: [...state.users, payload.user],
			}
		case actionTypes.USER_UPDATE:
			return {
				...state,
				users: state.users.map((user: ModelsUser) =>
					user.id === payload.user.id ? payload.user : user,
				),
			}
		case actionTypes.USER_DELETE:
			return {
				...state,
				users: state.users.filter(
					(user: ModelsUser) => user.id !== payload.userId,
				),
			}
		case actionTypes.USER_LOADING:
			return { ...state, loading: true, error: null }
		case actionTypes.USER_LOADED:
			return { ...state, loading: false, users: action.payload.users }
		case actionTypes.USER_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload.error,
				users: [],
			}
		default:
			return state
	}
}

export default userReducer
