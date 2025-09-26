import types from './types.js'

const initialState = {
	loading: false,
	genres: [],
	error: null,
}

const genreReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case types.GENRES_LOADING:
			return {
				...state,
				loading: true,
			}
		case types.GENRES_LOADED:
			return {
				...state,
				loading: false,
				genres: payload.genres,
			}
		case types.GENRES_ERROR:
			return {
				...state,
				loading: false,
				genres: [],
				error: payload.error,
			}
		default:
			return state
	}
}

export default genreReducer
