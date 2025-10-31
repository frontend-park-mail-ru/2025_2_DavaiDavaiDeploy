import { decode } from '@/helpers/decodeHelper/decodeHelper';
import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFilmPage } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	film: ModelsFilmPage | null;
	error: string | null;
}

/**
 * Начальное состояние редьюсера фильмов.
 */
const initialState: InitialState = {
	loading: false,
	film: null,
	error: null,
};

/**
 * Редьюсер для управления состоянием списка фильмов.
 */
const filmReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.FILM_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FILM_LOADED:
			return {
				...state,
				loading: false,
				film: {
					...payload.film,
					original_title: decode(payload.film.original_title),
				},
			};
		case actionTypes.FILM_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			};
		case actionTypes.CLEAR_FILM:
			return initialState;
		default:
			return state;
	}
};

export default filmReducer;
