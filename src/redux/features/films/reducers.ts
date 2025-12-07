import { mergeUnique } from '@/helpers/mergeUniqueHelper/mergeUniqueHelper';
import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsMainPageFilm } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	films: ModelsMainPageFilm[];
	error: string | null;
	cursor: string | null;
	recommendations: ModelsMainPageFilm[] | null;
	recommendationsError: string | null;
	recommendationsLoading: boolean;
}

/**
 * Начальное состояние редьюсера фильмов.
 */
const initialState: InitialState = {
	loading: false,
	films: [],
	error: null,
	cursor: null,
	recommendations: null,
	recommendationsError: null,
	recommendationsLoading: false,
};

/**
 * Редьюсер для управления состоянием списка фильмов.
 */
const filmsReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.FILMS_LOADING:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FILMS_LOADED:
			return {
				...state,
				loading: false,
				films: mergeUnique(state.films, payload.films),
				cursor: payload.cursor ? payload.cursor : null,
			};
		case actionTypes.FILMS_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				films: [],
			};
		case actionTypes.FILMS_CLEAR:
			return initialState;
		case actionTypes.RECOMMENDATIONS_LOADING:
			return {
				...state,
				recommendationsLoading: true,
				recommendationsError: null,
			};
		case actionTypes.RECOMMENDATIONS_LOADED:
			return {
				...state,
				recommendations: payload.films,
				recommendationsLoading: false,
				recommendationsError: null,
			};
		case actionTypes.RECOMMENDATIONS_ERROR:
			return {
				...state,
				recommendations: null,
				recommendationsError: payload.error,
			};
		default:
			return state;
	}
};

export default filmsReducer;
