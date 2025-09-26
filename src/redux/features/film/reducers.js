import types from './types.js'

const initialState = {
	loading: false,
	films: [],
	error: null,
}

const filmReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case types.FILMS_LOADING:
			return {
				...state,
				loading: true,
			}
		case types.FILMS_LOADED:
			return {
				...state,
				loading: false,
				// films: [...state.films, ...payload.films],
				films: payload.films,
			}
		case types.FILMS_ERROR:
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

export default filmReducer
