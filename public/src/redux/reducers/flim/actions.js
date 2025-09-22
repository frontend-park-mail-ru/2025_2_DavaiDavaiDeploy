import { filmsMock } from '../../../mocks/films'
import { FILMS_ERROR, FILMS_LOADED, FILMS_LOADING } from './types'

const setFilmsLoadingAction = () => {
	return {
		type: FILMS_LOADING,
	}
}

const returnFilmsAction = data => {
	return {
		type: FILMS_LOADED,
		payload: { films: data },
	}
}

const returnFilmsErrorAction = error => {
	return {
		type: FILMS_ERROR,
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
