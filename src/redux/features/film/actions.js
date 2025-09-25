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

const getFilmsAction = () => async dispatch => {
	dispatch(setFilmsLoadingAction())
	try {
		const response = await HTTPClient.get('/api/films')
		dispatch(returnFilmsAction(response.data))
	} catch (error) {
		dispatch(returnFilmsErrorAction(error.message || 'Error'))
	}
}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
}
