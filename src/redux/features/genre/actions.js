import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

/**
 * Action: устанавливает состояние загрузки для жанров
 * @returns {{type: string}} Action с типом GENRE_LOADING
 */
const setGenreLoadingAction = () => {
	return {
		type: types.GENRE_LOADING,
	}
}

/**
 * Action: устанавливает успешно загруженные данные жанра
 * @param {Object} data - Данные жанра
 * @returns {{type: string, payload: {genre: Object}}} Action с данными жанра
 */
const returnGenreAction = data => {
	return {
		type: types.GENRE_LOADED,
		payload: { genre: data },
	}
}

/**
 * Action: устанавливает успешно загруженные фильмы жанра
 * @param {Object} data - Данные фильмов
 * @returns {{type: string, payload: {films: Object}}} Action с данными фильмов
 */
const returnGenreFilmsAction = data => {
	return {
		type: types.GENRE_FILMS_LOADED,
		payload: { films: data },
	}
}

/**
 * Action: устанавливает успешно загруженный список жанров
 * @param {Object} data - Данные жанров
 * @returns {{type: string, payload: {genres: Object}}} Action со списком жанров
 */
const returnGenresAction = data => {
	return {
		type: types.GENRES_LOADED,
		payload: { genres: data },
	}
}

/**
 * Action: устанавливает состояние ошибки для операций с жанрами
 * @param {string} error - Сообщение об ошибке
 * @returns {{type: string, payload: {genres: Array, error: string}}} Action с ошибкой
 */
const returnGenreErrorAction = error => {
	return {
		type: types.GENRE_ERROR,
		payload: { genres: [], error: error },
	}
}

/**
 * Action: получает данные жанра по ID
 * @param {string|number} id - ID жанра
 * @returns {Function} Async function для dispatch
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
 * Action: получает список всех жанров
 * @returns {Function} Async function для dispatch
 */
const getGenresAction = () => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get('/genres')
		dispatch(returnGenresAction(response.data))
	} catch (error) {
		dispatch(returnGenreErrorAction(error.message || 'Error'))
	}
}

/**
 * Action: получает фильмы по жанру
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
