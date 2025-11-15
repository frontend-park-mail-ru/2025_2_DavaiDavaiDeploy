import type { FeedBack } from '@/components/feedBack/feedBack';
import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	error: string | null;
	message: FeedBack | null;
}

/**
 * Начальное состояние редьюсера фильмов.
 */
const initialState: InitialState = {
	loading: false,
	error: null,
	message: null,
};

const techSupReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action === 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.MESSAGE_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionTypes.MESSAGE_LOADED:
			return {
				...state,
				loading: false,
				message: payload.message,
			};
		case actionTypes.MESSAGE_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			};
		default:
			return state;
	}
};

export default techSupReducer;
