import type { ModelsUser } from '@/modules/HTTPClient/apiTypes'
import type { Dispatch } from '@/modules/redux/ReduxTypes'
import HTTPClient from '../../../modules/HTTPClient/index'
import types from './types'

/**
 * Создает действие для установки состояния загрузки пользователя.
 * @function
 * @returns {Object} Объект действия Redux с типом USER_LOADING.
 */
const setUserLoadingAction = () => {
	return {
		type: types.USER_LOADING,
	}
}

/**
 * Создает действие для успешной загрузки данных пользователя.
 * @function
 * @param {ModelsUser} data - Данные пользователя.
 * @returns {Object} Объект действия Redux с типом USER_LOADED и полезной нагрузкой.
 */
const returnUserAction = (data: ModelsUser) => {
	return {
		type: types.USER_LOADED,
		payload: { users: data },
	}
}

/**
 * Создает действие для обработки ошибки загрузки пользователя.
 * @function
 * @param {string} error - Сообщение об ошибке.
 * @returns {Object} Объект действия Redux с типом USER_ERROR и полезной нагрузкой.
 */
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

/**
 * Создает асинхронное действие для проверки авторизации пользователя.
 * @function
 * @returns {Function} Thunk-функция для диспетчеризации.
 */
const checkUserAction = () => async (dispatch: Dispatch) => {
	dispatch(setUserLoadingAction())
	try {
		const response = await HTTPClient.get<ModelsUser>('/auth/check')
		dispatch(returnUserAction(response.data))
	} catch (error: unknown) {
		let errorMessage: string = 'Произошла ошибка'

		if (error instanceof Error) {
			errorMessage = error.message
		} else if (typeof error === 'string') {
			errorMessage = error
		}

		dispatch(returnUserErrorAction(errorMessage))
	}
}

/**
 * Создает действие для добавления нового пользователя.
 * @function
 * @param {Object} user - Объект пользователя для добавления.
 * @returns {Object} Объект действия Redux с типом USER_CREATE и полезной нагрузкой.
 */

/**
 * Создает асинхронное действие для регистрации нового пользователя.
 * @function
 * @param {string} login - Логин пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Function} Thunk-функция для диспетчеризации.
 */
const registerUserAction =
	(login: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsUser>('/auth/signup', {
				data: {
					login: login,
					password: password,
				},
			})
			dispatch(returnUserAction(response.data))
		} catch (error: unknown) {
			let errorMessage: string = 'Произошла ошибка'

			if (error instanceof Error) {
				errorMessage = error.message
			} else if (typeof error === 'string') {
				errorMessage = error
			}

			dispatch(returnUserErrorAction(errorMessage))
		}
	}

/**
 * Создает асинхронное действие для входа пользователя в систему.
 * @function
 * @param {string} login - Логин пользователя.
 * @param {string} password - Пароль пользователя.
 * @returns {Function} Thunk-функция для диспетчеризации.
 */
const loginUserAction =
	(login: string, password: string) => async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsUser>('/auth/signin', {
				data: {
					login: login,
					password: password,
				},
			})
			dispatch(returnUserAction(response.data))
		} catch (error: unknown) {
			let errorMessage: string = 'Произошла ошибка'

			if (error instanceof Error) {
				errorMessage = error.message
			} else if (typeof error === 'string') {
				errorMessage = error
			}

			dispatch(returnUserErrorAction(errorMessage))
		}
	}

export default {
	registerUserAction,
	loginUserAction,
	checkUserAction,
	updateUserAction,
	deleteUserAction,
}
