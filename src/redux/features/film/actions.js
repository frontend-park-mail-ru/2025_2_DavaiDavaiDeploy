import { getFilmsMocks } from '../../../mocks/films.js'
import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

/**
 * Action: начало загрузки фильмов.
 * @returns {{ type: string }}
 */
const setFilmsLoadingAction = () => {
	return {
		type: types.FILMS_LOADING,
	}
}

/**
 * Action: успешная загрузка фильмов.
 *
 * @param {Array<Object>} data - Массив фильмов.
 * @returns {{ type: string, payload: { films: Array<Object> } }}
 */
const returnFilmsAction = data => {
	return {
		type: types.FILMS_LOADED,
		payload: { films: data },
	}
}

/**
 * Action: ошибка при загрузке фильмов.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns {{ type: string, payload: { films: [], error: string } }}
 */
const returnFilmsErrorAction = error => {
	return {
		type: types.FILMS_ERROR,
		payload: { films: [], error: error },
	}
}

/**
 * Action: очистка фильмов.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns { type: string }
 */
const clearFilmsAction = () => {
	return {
		type: types.FILMS_CLEAR,
	}
}

/**
 * Thunk: асинхронная загрузка фильмов с сервера.
 *
 * @param {number} limit - Количество фильмов.
 * @param {number} offset - Смещение.
 * @returns {Function} Thunk-функция для dispatch.
 */
const getFilmsAction = (limit, offset) => async dispatch => {
	dispatch(setFilmsLoadingAction())
	try {
		const response = await HTTPClient.get('/films', {
			params: { count: limit, offset },
		})
		dispatch(returnFilmsAction(response.data))
	} catch (error) {
		dispatch(returnFilmsErrorAction(error.message || 'Error'))
	}
}

/**
 * Thunk: загрузка моков фильмов (для разработки).
 *
 * @param {number} limit - Количество фильмов.
 * @param {number} offset - Смещение.
 * @returns {Function} Thunk-функция для dispatch.
 */
const getFilmsActionFake = (limit, offset) => async dispatch => {
	dispatch(returnFilmsAction(getFilmsMocks(limit, offset)))
}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
	getFilmsActionFake,
	clearFilmsAction,
}
