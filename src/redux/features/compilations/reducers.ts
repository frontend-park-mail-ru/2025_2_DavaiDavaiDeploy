import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsCompFilm, ModelsCompilation } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	compilationLoading: boolean;
	curCompilation: ModelsCompilation | null;
	compilationError: string | null;

	compilationsLoading: boolean;
	compilations: ModelsCompilation[];
	compilationsError: string | null;

	compilationFilmsLoading: boolean;
	compilationFilms: ModelsCompFilm[];
	compilationFilmsError: string | null;

	addError: string | null;
	deleteError: string | null;
}

/**
 * Начальное состояние редьюсера подборок.
 */
const initialState: InitialState = {
	compilationLoading: false,
	curCompilation: null,
	compilationError: null,

	compilationsLoading: false,
	compilations: [],
	compilationsError: null,

	compilationFilmsLoading: false,
	compilationFilms: [],
	compilationFilmsError: null,

	addError: null,
	deleteError: null,
};

/**
 * Редьюсер для управления состоянием подборок.
 */
const compilationReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action === 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.COMPILATION_LOADING:
			return {
				...state,
				compilationLoading: true,
				compilationError: null,
			};
		case actionTypes.COMPILATION_LOADED:
			return {
				...state,
				compilationLoading: false,
				compilationError: null,
				curCompilation: payload.compilation,
			};
		case actionTypes.COMPILATION_ERROR:
			return {
				...state,
				compilationLoading: false,
				compilationError: payload.error,
				curCompilation: null,
			};
		case actionTypes.COMPILATIONS_LOADING:
			return {
				...state,
				compilationsLoading: true,
				compilationsError: null,
			};
		case actionTypes.COMPILATIONS_LOADED:
			return {
				...state,
				compilationsLoading: false,
				compilationsError: null,
				compilations: payload.compilations,
			};
		case actionTypes.COMPILATIONS_ERROR:
			return {
				...state,
				compilationsLoading: false,
				compilationsError: payload.error,
				compilations: [],
			};
		case actionTypes.COMPILATION_FILMS_LOADING:
			return {
				...state,
				compilationFilmsLoading: true,
				compilationFilmsError: null,
			};
		case actionTypes.COMPILATION_FILMS_LOADED:
			return {
				...state,
				compilationFilmsLoading: false,
				compilationFilmsError: null,
				compilationFilms: payload.films,
			};
		case actionTypes.COMPILATION_FILMS_ERROR:
			return {
				...state,
				compilationFilmsLoading: false,
				compilationFilmsError: payload.error,
				compilationFilms: [],
			};
		case actionTypes.CLEAR_COMPILATION:
			return initialState;
		case actionTypes.ADD_TO_FAVORITES:
			if (!payload || !payload.id) {
				return state;
			}

			return {
				...state,
				compilationFilms: state.compilationFilms
					? state.compilationFilms.map((film: ModelsCompFilm) =>
							film.id === payload.id ? { ...film, is_liked: true } : film,
						)
					: null,
			};
		case actionTypes.DELETE_FROM_FAVORITES:
			if (!payload || !payload.id) {
				return state;
			}

			return {
				...state,
				compilationFilms: state.compilationFilms
					? state.compilationFilms.map((film: ModelsCompFilm) =>
							film.id === payload.id ? { ...film, is_liked: false } : film,
						)
					: null,
			};
		case actionTypes.ADD_TO_FAVORITES_ERROR:
			return {
				...state,
				addError: payload.error,
			};
		case actionTypes.DELETE_FROM_FAVORITES_ERROR:
			return {
				...state,
				deleteError: payload.error,
			};
		default:
			return state;
	}
};

export default compilationReducer;
