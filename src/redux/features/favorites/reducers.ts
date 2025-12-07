import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFavFilm } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	favorites: ModelsFavFilm[] | null;
	error: string | null;
	deleteError: string | null;
	addError: string | null;
}

/**
 * Начальное состояние редьюсера избранного.
 */
const initialState: InitialState = {
	loading: false,
	favorites: null,
	error: null,
	deleteError: null,
	addError: null,
};

/**
 * Редьюсер для управления состоянием избранных фильмов.
 */
const favoritesReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.FAVORITES_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionTypes.FAVORITES_LOADED:
			return {
				...state,
				loading: false,
				error: null,
				favorites: payload.favorites,
			};
		case actionTypes.FAVORITES_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				favorites: null,
			};
		case actionTypes.DELETE_FROM_FAVORITES_ERROR:
			return {
				...state,
				deleteError: payload.error,
			};
		case actionTypes.ADD_TO_FAVORITES_ERROR:
			return {
				...state,
				addError: payload.error,
			};
		default:
			return state;
	}
};

export default favoritesReducer;
