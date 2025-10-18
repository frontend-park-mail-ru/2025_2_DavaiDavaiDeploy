import { mergeUniqueFilms } from '@/helpers/mergeUniqueFilmsHelper/mergeUniqueFilmsHelper'
import type { ModelsFilm } from '@/modules/HTTPClient/types/api'
import type { Action } from '@/modules/redux/types/actions'
import type { Reducer } from '@/modules/redux/types/reducers'
import type { State } from '@/modules/redux/types/store'
import actionTypes from './actionTypes'

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
 */
const filmReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action == 'function') {
		return state
	}

	const { type, payload } = action

	switch (type) {
		case actionTypes.FILMS_LOADING:
			return {
				...state,
				loading: true,
			}
		case actionTypes.FILMS_LOADED:
			return {
				...state,
				loading: false,
				films: mergeUniqueFilms(state.films, payload.films),
			}
		case actionTypes.FILMS_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			}
		case actionTypes.FILMS_CLEAR:
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
