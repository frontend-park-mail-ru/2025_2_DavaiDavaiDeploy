import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsTopFilm } from '@/types/models';
import actionTypes from './actionTypes';

/**
 * Начальное состояние редьюсера фильма.
 * @type {{ loading: boolean, TOP_FILM: Array<Object>, error: string | null }}
 */
const initialState: State = {
	loading: false,
	film: {} as ModelsTopFilm,
	error: null,
};

/**
 * Редьюсер для управления состоянием фильма.
 */
const topFilmReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.TOP_FILM_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.TOP_FILM_LOADED:
			return {
				...state,
				loading: false,
				film: payload.film,
			};
		case actionTypes.TOP_FILM_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			};
		default:
			return state;
	}
};

export default topFilmReducer;
