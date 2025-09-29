import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

/**
 * Action: начало загрузки todos.
 * @returns {{ type: string }}
 */
const setTodosLoadingAction = () => {
	return {
		type: types.TODOS_FETCH_START,
	}
}

/**
 * Action: успешная загрузка todos.
 *
 * @param {Array<Object>} data - Список задач.
 * @returns {{ type: string, payload: { todos: Array<Object> } }}
 */
const returnTodosAction = data => {
	return {
		type: types.TODOS_FETCH_SUCCESS,
		payload: { todos: data },
	}
}

/**
 * Action: ошибка при загрузке todos.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns {{ type: string, payload: { todos: [], error: string } }}
 */
const returnTodosErrorAction = error => {
	return {
		type: types.TODOS_FETCH_FAILURE,
		payload: { todos: [], error: error },
	}
}

/**
 * Thunk: асинхронная загрузка задач с сервера.
 *
 * @param {string} url - URL для запроса.
 * @param {number} limit - Количество задач.
 * @returns {Function} Thunk-функция для dispatch.
 */
export const fetchTodos = (url, limit) => async dispatch => {
	dispatch(setTodosLoadingAction())
	try {
		const response = await HTTPClient.get(url, { params: { limit: limit } })
		dispatch(returnTodosAction(response.data.todos))
	} catch (error) {
		dispatch(returnTodosErrorAction(error.message || 'Error'))
	}
}

export default {
	fetchTodos,
	setTodosLoadingAction,
	returnTodosAction,
	returnTodosErrorAction,
}
