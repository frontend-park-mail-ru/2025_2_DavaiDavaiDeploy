import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFilmInCalendar } from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	loading: boolean;
	calendar: ModelsFilmInCalendar[] | null;
	error: string | null;
	addError: string | null;
	deleteError: string | null;
}

/**
 * Начальное состояние редьюсера календаря.
 */
const initialState: InitialState = {
	loading: false,
	calendar: null,
	error: null,
	addError: null,
	deleteError: null,
};

/**
 * Редьюсер для управления состоянием календаря.
 */
const calendarReducer: Reducer = (
	state = initialState,
	action: Action,
): State => {
	if (typeof action == 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.CALENDAR_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionTypes.CALENDAR_LOADED:
			return {
				...state,
				loading: false,
				error: null,
				calendar: payload.calendar,
			};
		case actionTypes.CALENDAR_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				calendar: null,
			};
		case actionTypes.ADD_TO_FAVORITES:
			return {
				...state,
				calendar: state.calendar
					? state.calendar.map((film: ModelsFilmInCalendar) =>
							film.id === payload.id ? { ...film, is_liked: true } : film,
						)
					: null,
			};
		case actionTypes.DELETE_FROM_FAVORITES:
			return {
				...state,
				calendar: state.calendar
					? state.calendar.map((film: ModelsFilmInCalendar) =>
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

export default calendarReducer;
