import types from './types.js'

const initialState = {
	loading: false,
	genres: [],
	curGenre: {},
	error: null,
}

const genreReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case types.GENRE_LOADING:
			return {
				...state,
				loading: true,
			}
		case types.GENRE_LOADED:
			return {
				...state,
				loading: false,
				curGenre: payload.genre,
				genres: payload.genres,
			}
		case types.GENRES_LOADED:
			return {
				...state,
				loading: false,
				genres: payload.genres,
			}
		case types.GENRE_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			}
		default:
			return state
	}
}

export default genreReducer
