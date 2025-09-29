import types from './types.js'

/**
 * Начальное состояние редьюсера фильмов.
 * @type {{ loading: boolean, films: Array<Object>, error: string | null }}
 */
const initialState = {
	loading: false,
	films: [],
	error: null,
}

/**
 * Редьюсер для управления состоянием списка фильмов.
 *
 * @param {typeof initialState} state - Предыдущее состояние.
 * @param {{ type: string, payload?: any }} action - Action.
 * @returns {typeof initialState} Новое состояние.
 */
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
				films: [...state.films, ...payload.films],
			}
		case types.FILMS_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			}
		case types.FILMS_CLEAR:
			return {
				...state,
				films: [],
				error: null,
				loading: false,
			}
		default:
			return state
	}
}

export default filmReducer

/**
 * Селектор: получить список фильмов из состояния.
 * @param {Object} state - Состояние всего хранилища.
 * @returns {Array<Object>} Список фильмов.
 */
export const getFilms = state => state.film.films

/**
 * Селектор: получить весь раздел `film` из состояния.
 * @param {Object} state - Состояние всего хранилища.
 * @returns {Object} Состояние раздела `film`.
 */
export const getFilmSection = state => state.film
