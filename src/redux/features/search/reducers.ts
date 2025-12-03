import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsSearchResponse } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	voiceSearchIsWorking: boolean;
	searchResult: ModelsSearchResponse | null;
	error: string | null;
}

/**
 * Начальное состояние редьюсера поиска.
 */
const initialState: InitialState = {
	loading: false,
	voiceSearchIsWorking: false,
	searchResult: null,
	error: null,
};

/**
 * Редьюсер для управления состоянием поиска.
 */
const searchReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.SEARCH_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionTypes.SEARCH_LOADED:
			return {
				...state,
				loading: false,
				error: null,
				searchResult: payload.result,
			};

		case actionTypes.SEARCH_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				searchResult: null,
			};

		case actionTypes.CLEAR_SEARCH_RESULT:
			return {
				...state,
				searchResult: null,
				voiceSearchIsWorking: false,
			};

		case actionTypes.VOICE_SEARCH_LOADED:
			return {
				...state,
				loading: false,
				voiceSearchIsWorking: false,
				error: null,
				voiceSearchResult: payload.result,
			};
		case actionTypes.CLEAR_VOICE_SEARCH_RESULT:
			return {
				...state,
				voiceSearchResult: null,
				voiceSearchIsWorking: false,
			};
		case actionTypes.VOICE_SEARCH_IS_WORKING:
			return {
				...state,
				voiceSearchIsWorking: true,
			};
		default:
			return state;
	}
};

export default searchReducer;
