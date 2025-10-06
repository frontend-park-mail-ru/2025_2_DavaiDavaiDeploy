import types from './types.js'

/**
 * Начальное состояние редьюсера жанров.
 * @type {{ loading: boolean, genres: Array<Object>, error: string | null }}
 */
const initialState = {
	genreLoading: false,
	curGenre: {},
	genreError: null,

	genresLoading: false,
	genres: [],
	genresError: null,

	genreFilmsLoading: false,
	genreFilms: [],
	genreFilmsError: null,
}

/**
 * Редьюсер для управления состоянием жанров.
 *
 * @param {typeof initialState} state - Текущее состояние.
 * @param {{ type: string, payload?: any }} action - Action.
 * @returns {typeof initialState} Новое состояние.
 */
const genreReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case types.GENRE_LOADING:
			return {
				...state,
				genreLoading: true,
				genreError: null,
			}
		case types.GENRE_LOADED:
			return {
				...state,
				genreLoading: false,
				genreError: null,
				curGenre: payload.genre,
			}
		case types.GENRE_ERROR:
			return {
				...state,
				genreLoading: false,
				genreError: payload.error,
				curGenre: null,
			}
		case types.GENRES_LOADING:
			return {
				...state,
				genresLoading: true,
				genresError: null,
			}
		case types.GENRES_LOADED:
			return {
				...state,
				genresLoading: false,
				genresError: null,
				genres: payload.genres,
			}
		case types.GENRES_ERROR:
			return {
				...state,
				genresLoading: false,
				genresError: payload.error,
				genres: [],
			}
		case types.GENRE_FILMS_LOADING:
			return {
				...state,
				genreFilmsLoading: true,
				genreFilmsError: null,
			}
		case types.GENRE_FILMS_LOADED:
			return {
				...state,
				genreFilmsLoading: false,
				genreFilmsError: null,
				genreFilms: payload.films,
			}
		case types.GENRE_FILMS_ERROR:
			return {
				...state,
				genreFilmsLoading: false,
				genreFilmsError: payload.error,
				genreFilms: [],
			}
		default:
			return state
	}
}

export default genreReducer
