import types from './types.js'

/**
 * Начальное состояние редьюсера жанров.
 * @type {{ loading: boolean, genres: Array<Object>, error: string | null }}
 */
const initialState = {
	loading: false,
	genres: [],
	error: null,
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
