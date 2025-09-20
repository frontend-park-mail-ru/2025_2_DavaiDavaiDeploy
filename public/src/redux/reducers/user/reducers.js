import { USER_CREATE, USER_DELETE, USER_UPDATE } from './types.js'

const initialState = {
	users: [],
}

const userReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case USER_CREATE:
			return {
				...state,
				users: [...state.users, payload.user],
			}
		case USER_UPDATE:
			return {
				...state,
				users: state.users.map(user =>
					user.id === payload.user.id ? payload.user : user,
				),
			}
		case USER_DELETE:
			return {
				...state,
				users: state.users.filter(user => user.id !== payload.userId),
			}
		default:
			return state
	}
}

export default {
	userReducer,
}
