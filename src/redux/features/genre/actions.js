import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

/**
 * Action: начало загрузки жанров.
 * @returns {{ type: string }}
 */
const setGenreLoadingAction = () => {
	return {
		type: types.GENRE_LOADING,
	}
}

/**
 * Action: получение фильмоп по жанру.
 *
 * @param {Object} data - Сообщение об ошибке.
 * @returns {{ type: string, payload: { films: data } }}
 */
const returnGenreFilmsAction = data => {
	return {
		type: types.GENRE_FILMS_LOADED,
		payload: { films: data },
	}
}

/**
 * Action: успешная загрузка жанров.
 *
 * @param {Array<Object>} data - Массив жанров.
 * @returns {{ type: string, payload: { genres: Array<Object> } }}
 */
const getGenresAction = data => {
	return {
		type: types.GENRES_LOADED,
		payload: { genres: data },
	}
}

/**
 * Action: ошибка при загрузке жанров.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns {{ type: string, payload: { genres: [], error: string } }}
 */
const returnGenreErrorAction = error => {
	return {
		type: types.GENRE_ERROR,
		payload: { genres: [], error: error },
	}
}

/**
 * Action: ошибка при загрузке жанров.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns {{ type: string, payload: { genres: [], error: string } }}
 */
const returnGenreAction = data => {
	return {
		type: types.GENRE_LOADED,
		payload: { genre: data },
	}
}

/**
 * Thunk: асинхронная загрузка жанров с сервера.
 *
 * @returns {Function} Thunk-функция для dispatch.
 */
const getGenreAction = id => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get(`/genres/${id}`)
		dispatch(returnGenreAction(response.data))
	} catch (error) {
		dispatch(returnGenreErrorAction(error.message || 'Error'))
	}
}

/**
 * Action для получения фильмов по жанру.
 *
 * @param {string|number} id - ID жанра
 * @param {number} limit - Количество фильмов для получения
 * @param {number} offset - Смещение для пагинации
 * @returns {Function} Async function для dispatch
 */
const getGenreFilmsAction = (id, limit, offset) => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get(`/films/genre/${id}`, {
			params: { count: limit, offset },
		})
		dispatch(returnGenreFilmsAction(response.data))
	} catch (error) {
		dispatch(returnGenreErrorAction(error.message || 'Error'))
	}
}

export default {
	getGenreAction,
	getGenresAction,
	getGenreFilmsAction,
	setGenreLoadingAction,
	returnGenreAction,
	returnGenreErrorAction,
}
