import { getFilmsMocks } from '../../../mocks/films.js'
import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

const setFilmsLoadingAction = () => {
	return {
		type: types.FILMS_LOADING,
	}
}

const returnFilmsAction = data => {
	return {
		type: types.FILMS_LOADED,
		payload: { films: data },
	}
}

const returnFilmsErrorAction = error => {
	return {
		type: types.FILMS_ERROR,
		payload: { films: [], error: error },
	}
}

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

const getFilmsActionFake = (limit, offset) => async dispatch => {
	dispatch(returnFilmsAction(getFilmsMocks(limit, offset)))
}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
	getFilmsActionFake,
}
