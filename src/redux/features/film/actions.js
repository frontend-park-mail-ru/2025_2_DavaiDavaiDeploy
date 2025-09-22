import { filmsMock } from '../../../mocks/films'
import types from './types'

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

const getFilmsAction = () => {
	return async dispatch => {
		dispatch(setFilmsLoadingAction())
		setTimeout(() => {
			try {
				dispatch(returnFilmsAction(filmsMock))
			} catch (error) {
				dispatch(returnFilmsErrorAction(error.message))
			}
		}, 1000)
	}
}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
}
