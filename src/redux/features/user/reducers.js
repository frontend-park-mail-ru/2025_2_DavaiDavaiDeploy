import types from './types.js'

/**
 * Начальное состояние редьюсера пользователей.
 * @type {Object}
 * @property {Array<Object>} users - Список пользователей.
 */
const initialState = {
	users: [],
}

/**
 * Редьюсер пользователей для обработки действий create, update и delete.
 * @function
 * @param {Object} [state=initialState] - Текущее состояние.
 * @param {Object} action - Действие Redux.
 * @param {string} action.type - Тип действия.
 * @param {Object} action.payload - Полезная нагрузка действия.
 * @returns {Object} Новое состояние после применения действия.
 */
export const userReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case types.USER_CREATE:
			return {
				...state,
				users: [...state.users, payload.user],
			}
		case types.USER_UPDATE:
			return {
				...state,
				users: state.users.map(user =>
					user.id === payload.user.id ? payload.user : user,
				),
			}
		case types.USER_DELETE:
			return {
				...state,
				users: state.users.filter(user => user.id !== payload.userId),
			}
		case types.USER_LOADING:
			return { ...state, loading: true, error: null }
		case types.USER_LOADED:
			return { ...state, loading: false, users: action.payload.users }
		case types.USER_ERROR:
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
