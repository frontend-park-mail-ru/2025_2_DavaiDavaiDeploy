import types from './types'

/**
 * Создает действие для добавления нового пользователя.
 * @function
 * @param {Object} user - Объект пользователя для добавления.
 * @returns {Object} Объект действия Redux с типом USER_CREATE и полезной нагрузкой.
 */
const createUserAction = user => {
	return {
		type: types.USER_CREATE,
		payload: { user },
	}
}

/**
 * Создает действие для обновления существующего пользователя.
 * @function
 * @param {Object} user - Объект пользователя с обновленными данными.
 * @returns {Object} Объект действия Redux с типом USER_UPDATE и полезной нагрузкой.
 */
const updateUserAction = user => {
	return {
		type: types.USER_UPDATE,
		payload: { user },
	}
}

/**
 * Создает действие для удаления пользователя по его идентификатору.
 * @function
 * @param {string|number} userId - Идентификатор пользователя для удаления.
 * @returns {Object} Объект действия Redux с типом USER_DELETE и полезной нагрузкой.
 */
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
