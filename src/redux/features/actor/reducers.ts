import { decode } from '@/helpers/decodeHelper/decodeHelper';
import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsActorPage, ModelsMainPageFilm } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	actorLoading: boolean;
	curActor: ModelsActorPage | null;
	actorError: string | null;

	actorFilmsLoading: boolean;
	actorFilms: ModelsMainPageFilm[];
	actorFilmsError: string | null;
}

/**
 * Начальное состояние редьюсера жанров.
 */
const initialState: InitialState = {
	actorLoading: false,
	curActor: null,
	actorError: null,

	actorFilmsLoading: false,
	actorFilms: [],
	actorFilmsError: null,
};

/**
 * Редьюсер для управления состоянием жанров.
 */
const actorReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.ACTOR_LOADING:
			return {
				...state,
				actorLoading: true,
				actorError: null,
			};
		case actionTypes.ACTOR_LOADED:
			return {
				...state,
				actorLoading: false,
				actorError: null,
				curActor: {
					...payload.actor,
					original_name: decode(payload.actor.original_name),
				},
			};
		case actionTypes.ACTOR_ERROR:
			return {
				...state,
				actorLoading: false,
				actorError: payload.error,
				curActor: null,
			};
		case actionTypes.ACTOR_FILMS_LOADING:
			return {
				...state,
				actorFilmsLoading: true,
				actorFilmsError: null,
			};
		case actionTypes.ACTOR_FILMS_LOADED:
			return {
				...state,
				actorFilmsLoading: false,
				actorFilmsError: null,
				// actorFilms: payload.films,
				actorFilms: Array.from({ length: 10 }, () => [...payload.films]).flat(),
			};
		case actionTypes.ACTOR_FILMS_ERROR:
			return {
				...state,
				actorFilmsLoading: false,
				actorFilmsError: payload.error,
				actorFilms: [],
			};
		default:
			return state;
	}
};

export default actorReducer;
