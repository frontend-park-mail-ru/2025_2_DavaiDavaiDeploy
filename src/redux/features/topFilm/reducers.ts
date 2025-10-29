import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsPromoFilm } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	film: ModelsPromoFilm | {};
	error: string | null;
}

/**
 * Начальное состояние редьюсера фильма.
 */
const initialState: InitialState = {
	loading: false,
	film: {},
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
