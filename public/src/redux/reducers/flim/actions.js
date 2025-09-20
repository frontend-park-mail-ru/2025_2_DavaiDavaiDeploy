import { filmsMock } from '../../../mock/films'
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

		try {
			const response = await new Promise(resolve => {
				setTimeout(() => {
					resolve({ data: filmsMock })
				}, 1000)
			})

			dispatch(returnFilmsAction(response.data))
		} catch (error) {
			dispatch(returnFilmsErrorAction(error.message))
		}
	}
}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
    returnFilmsAction,
    returnFilmsErrorAction,
}
