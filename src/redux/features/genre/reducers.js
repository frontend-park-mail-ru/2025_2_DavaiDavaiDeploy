import types from './types.js'

const initialState = {
	loading: false,
	genres: [],
	curGenre: {},
	films: [],
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
			}
		case types.GENRES_LOADED:
			return {
				...state,
				loading: false,
				genres: payload.genres,
			}
		case types.GENRE_FILMS_LOADED:
			return {
				...state,
				loading: false,
				films: [...state.films, ...payload.films],
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
