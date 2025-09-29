import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

/**
 * Action: начало загрузки жанров.
 * @returns {{ type: string }}
 */
const setGenresLoadingAction = () => {
	return {
		type: types.GENRES_LOADING,
	}
}

/**
 * Action: успешная загрузка жанров.
 *
 * @param {Array<Object>} data - Массив жанров.
 * @returns {{ type: string, payload: { genres: Array<Object> } }}
 */
const returnGenresAction = data => {
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
const returnGenresErrorAction = error => {
	return {
		type: types.GENRES_ERROR,
		payload: { genres: [], error: error },
	}
}

/**
 * Thunk: асинхронная загрузка жанров с сервера.
 *
 * @returns {Function} Thunk-функция для dispatch.
 */
const getGenresAction = () => async dispatch => {
	dispatch(setGenresLoadingAction())
	try {
		const response = await HTTPClient.get('/genres')
		dispatch(returnGenresAction(response.data))
	} catch (error) {
		dispatch(returnGenresErrorAction(error.message || 'Error'))
	}
}

export default {
	getGenresAction,
	setGenresLoadingAction,
	returnGenresAction,
	returnGenresErrorAction,
}
