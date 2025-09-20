import { FILMS_ERROR, FILMS_LOADED, FILMS_LOADING } from './types'

const initialState = {
	loading: false,
	films: [],
	error: null,
}

const filmReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case FILMS_LOADING:
			return {
				...state,
				loading: true,
			}
		case FILMS_LOADED:
			return {
				...state,
				loading: false,
				films: payload.films,
			}
		case FILMS_ERROR:
			return {
				...state,
				loading: false,
				films: [],
				error: payload.error,
			}
		default:
			return state
	}
}

export default {
	filmReducer,
}
