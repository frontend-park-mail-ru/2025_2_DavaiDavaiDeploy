import type { ModelsUser } from '@/modules/HTTPClient/apiTypes'
import type { Dispatch } from '@/modules/redux/ReduxTypes'
import HTTPClient from '../../../modules/HTTPClient/index'
import types from './types'

const setUserLoadingAction = () => {
	return {
		type: types.USER_LOADING,
	}
}

const returnUserAction = (data: ModelsUser) => {
	return {
		type: types.USER_LOADED,
		payload: { users: data },
	}
}

const returnUserErrorAction = (error: string) => {
	return {
		type: types.USER_ERROR,
		payload: { users: [], error: error },
	}
}

/**
 * Создает действие для обновления существующего пользователя.
 * @function
 * @param {Object} user - Объект пользователя с обновленными данными.
 * @returns {Object} Объект действия Redux с типом USER_UPDATE и полезной нагрузкой.
 */
const updateUserAction = (login: string, password: string) => {
	return {
		type: types.USER_UPDATE,
		payload: { login: login, password: password },
	}
}

/**
 * Создает действие для удаления пользователя по его идентификатору.
 * @function
 * @param {string|number} userId - Идентификатор пользователя для удаления.
 * @returns {Object} Объект действия Redux с типом USER_DELETE и полезной нагрузкой.
 */
const deleteUserAction = (userId: string | number) => {
	return {
		type: types.USER_DELETE,
		payload: { userId: userId },
	}
}

const checkUserAction = () => async (dispatch: Dispatch) => {
	dispatch(setUserLoadingAction())
	try {
		const response = await HTTPClient.get('/auth/check')
		dispatch(returnUserAction(response.data))
	} catch (error) {
		if (error instanceof Error) {
			dispatch(returnUserErrorAction(error.message || 'Error'))
		}
	}
}

/**
 * Создает действие для добавления нового пользователя.
 * @function
 * @param {Object} user - Объект пользователя для добавления.
 * @returns {Object} Объект действия Redux с типом USER_CREATE и полезной нагрузкой.
 */

const registerUserAction =
	(login: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post('/auth/signup', {
				data: {
					login: login,
					password: password,
				},
			})
			dispatch(returnUserAction(response.data))
		} catch (error) {
			if (error instanceof Error) {
				dispatch(returnUserErrorAction(error.message || 'Error'))
			}
		}
	}

const loginUserAction =
	(login: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post('/auth/signin', {
				data: {
					login: login,
					password: password,
				},
			})
			dispatch(returnUserAction(response.data))
		} catch (error) {
			if (error instanceof Error) {
				dispatch(returnUserErrorAction(error.message || 'Error'))
			}
		}
	}

export default {
	registerUserAction,
	loginUserAction,
	checkUserAction,
	updateUserAction,
	deleteUserAction,
}
