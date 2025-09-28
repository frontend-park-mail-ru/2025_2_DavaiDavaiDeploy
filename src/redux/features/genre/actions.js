import HTTPClient from '../../../modules/HTTPClient/index.js'
import types from './types.js'

const setGenresLoadingAction = () => {
	return {
		type: types.GENRES_LOADING,
	}
}

const returnGenresAction = data => {
	return {
		type: types.GENRES_LOADED,
		payload: { genres: data },
	}
}

const returnGenresErrorAction = error => {
	return {
		type: types.GENRES_ERROR,
		payload: { genres: [], error: error },
	}
}

const getGenresAction = () => async dispatch => {
	dispatch(setGenresLoadingAction())
	try {
		const response = await HTTPClient.get('/api/genres')
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
