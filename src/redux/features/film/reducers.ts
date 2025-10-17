import { mergeUniqueFilms } from '@/helpers/mergeUniqueFilmsHelper/mergeUniqueFilmsHelper'
import type { ModelsFilm } from '@/modules/HTTPClient/apiTypes'
import type { Action, State } from '@/modules/redux/ReduxTypes'
import types from './types'

/**
 * Начальное состояние редьюсера фильмов.
 * @type {{ loading: boolean, films: Array<Object>, error: string | null }}
 */
const initialState: State = {
	loading: false,
	films: [] as ModelsFilm[],
	error: null,
}

/**
 * Редьюсер для управления состоянием списка фильмов.
 *
 * @param {typeof initialState} state - Предыдущее состояние.
 * @param {{ type: string, payload?: any }} action - Action.
 * @returns {typeof initialState} Новое состояние.
 */
const filmReducer = (state = initialState, action: Action) => {
	if (typeof action == 'function') {
		return state
	}

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
				films: mergeUniqueFilms(state.films, payload.films),
			}
		case types.FILMS_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			}
		case types.FILMS_CLEAR:
			return {
				films: [],
				error: null,
				loading: false,
			}
		default:
			return state
	}
}

export default filmReducer
