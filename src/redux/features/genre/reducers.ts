import type { ModelsFilm, ModelsGenre } from '@/modules/HTTPClient/types/api'
import type { Action } from '@/modules/redux/types/actions'
import type { Reducer } from '@/modules/redux/types/reducers'
import type { State } from '@/modules/redux/types/store'
import actionTypes from './actionTypes'

/**
 * Начальное состояние редьюсера жанров.
 * @type {{ loading: boolean, genres: Array<Object>, error: string | null }}
 */
const initialState: State = {
	genreLoading: false,
	curGenre: {} as ModelsGenre,
	genreError: null,

	genresLoading: false,
	genres: [] as ModelsGenre[],
	genresError: null,

	genreFilmsLoading: false,
	genreFilms: [] as ModelsFilm[],
	genreFilmsError: null,
}

/**
 * Редьюсер для управления состоянием жанров.
 */
const genreReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action == 'function') {
		return state
	}
	const { type, payload } = action

	switch (type) {
		case actionTypes.GENRE_LOADING:
			return {
				...state,
				genreLoading: true,
				genreError: null,
			}
		case actionTypes.GENRE_LOADED:
			return {
				...state,
				genreLoading: false,
				genreError: null,
				curGenre: payload.genre,
			}
		case actionTypes.GENRE_ERROR:
			return {
				...state,
				genreLoading: false,
				genreError: payload.error,
				curGenre: null,
			}
		case actionTypes.GENRES_LOADING:
			return {
				...state,
				genresLoading: true,
				genresError: null,
			}
		case actionTypes.GENRES_LOADED:
			return {
				...state,
				genresLoading: false,
				genresError: null,
				genres: payload.genres,
			}
		case actionTypes.GENRES_ERROR:
			return {
				...state,
				genresLoading: false,
				genresError: payload.error,
				genres: [],
			}
		case actionTypes.GENRE_FILMS_LOADING:
			return {
				...state,
				genreFilmsLoading: true,
				genreFilmsError: null,
			}
		case actionTypes.GENRE_FILMS_LOADED:
			return {
				...state,
				genreFilmsLoading: false,
				genreFilmsError: null,
				genreFilms: payload.films,
			}
		case actionTypes.GENRE_FILMS_ERROR:
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
