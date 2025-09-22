import { USER_CREATE, USER_DELETE, USER_UPDATE } from './types'

const createUserAction = user => {
	return {
		type: USER_CREATE,
		payload: { user },
	}
}

const updateUserAction = user => {
	return {
		type: USER_UPDATE,
		payload: { user },
	}
}

const deleteUserAction = userId => {
	return {
		type: USER_DELETE,
		payload: { userId },
	}
}

export default {
	createUserAction,
	updateUserAction,
	deleteUserAction,
}
