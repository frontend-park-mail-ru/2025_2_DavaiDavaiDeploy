import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

const setGenreLoadingAction = () => {
	return {
		type: types.GENRE_LOADING,
	}
}

const returnGenreAction = data => {
	return {
		type: types.GENRE_LOADED,
		payload: { genre: data },
	}
}

const returnGenreFilmsAction = data => {
	return {
		type: types.GENRE_FILMS_LOADED,
		payload: { films: data },
	}
}

const returnGenresAction = data => {
	return {
		type: types.GENRES_LOADED,
		payload: { genres: data },
	}
}

const returnGenreErrorAction = error => {
	return {
		type: types.GENRE_ERROR,
		payload: { genres: [], error: error },
	}
}

const getGenreAction = id => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get(`/api/genres/${id}`)
		dispatch(returnGenreAction(response.data))
	} catch (error) {
		dispatch(returnGenreErrorAction(error.message || 'Error'))
	}
}

const getGenresAction = () => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get('/api/genres')
		dispatch(returnGenresAction(response.data))
	} catch (error) {
		dispatch(returnGenreErrorAction(error.message || 'Error'))
	}
}

const getGenreFilmsAction = (id, limit, offset) => async dispatch => {
	dispatch(setGenreLoadingAction())
	try {
		const response = await HTTPClient.get(`/api/films/genre/${id}`, {
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
