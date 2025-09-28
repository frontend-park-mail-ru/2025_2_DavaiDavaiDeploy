import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

const setUserLoadingAction = () => {
	return {
		type: types.USER_LOADING,
	}
}

const returnUserAction = data => {
	return {
		type: types.USER_LOADED,
		payload: { users: data },
	}
}

const returnUserErrorAction = error => {
	return {
		type: types.USER_ERROR,
		payload: { users: [], error: error },
	}
}

// const createUserAction = (login, password) => {
// 	return {
// 		type: types.USER_CREATE,
// 		payload: { login: login, password: password },
// 	}
// }

const updateUserAction = (login, password) => {
	return {
		type: types.USER_UPDATE,
		payload: { login: login, password: password },
	}
}

const deleteUserAction = userId => {
	return {
		type: types.USER_DELETE,
		payload: { userId: userId },
	}
}

const checkUserAction = () => async dispatch => {
	dispatch(setUserLoadingAction())
	try {
		const response = await HTTPClient.get('/api/auth/check')
		dispatch(returnUserAction(response.data))
	} catch (error) {
		dispatch(returnUserErrorAction(error.message || 'Error'))
	}
}

const registerUserAction = (login, password) => async dispatch => {
	try {
		const response = await HTTPClient.get('/api/auth/signup', {
			params: { login: login, password: password },
		})
		dispatch(returnUserAction(response.data))
	} catch (error) {
		dispatch(returnUserErrorAction(error.message || 'Error'))
	}
}

const loginUserAction = (login, password) => async dispatch => {
	try {
		const response = await HTTPClient.get('/api/auth/signin', {
			params: { login: login, password: password },
		})
		dispatch(returnUserAction(response.data))
	} catch (error) {
		dispatch(returnUserErrorAction(error.message || 'Error'))
	}
}

export default {
	registerUserAction,
	loginUserAction,
	checkUserAction,
	// createUserAction,
	updateUserAction,
	deleteUserAction,
}
