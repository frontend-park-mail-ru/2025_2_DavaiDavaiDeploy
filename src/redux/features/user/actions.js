import types from './types'

const createUserAction = user => {
	return {
		type: types.USER_CREATE,
		payload: { user },
	}
}

const updateUserAction = user => {
	return {
		type: types.USER_UPDATE,
		payload: { user },
	}
}

const deleteUserAction = userId => {
	return {
		type: types.USER_DELETE,
		payload: { userId },
	}
}

export default {
	createUserAction,
	updateUserAction,
	deleteUserAction,
}
