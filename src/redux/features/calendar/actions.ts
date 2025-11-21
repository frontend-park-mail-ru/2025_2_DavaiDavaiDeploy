import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFilmInCalendar } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Устанавливает состояние загрузки календаря
 */
const setCalendarLoadingAction = (): Action => {
	return {
		type: actionTypes.CALENDAR_LOADING,
	};
};

/**
 * Возвращает успешно загруженные данные календаря
 */
const returnCalendarAction = (data: ModelsFilmInCalendar[]): Action => {
	return {
		type: actionTypes.CALENDAR_LOADED,
		payload: { calendar: data },
	};
};

/**
 * Устанавливает состояние ошибки при загрузке данных календаря
 */
const returnCalendarErrorAction = (error: string): Action => {
	return {
		type: actionTypes.CALENDAR_ERROR,
		payload: { error },
	};
};

/**
 * Загружает фильмы календаря с пагинацией
 */
const getCalendarAction =
	(limit: number, offset: number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setCalendarLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsFilmInCalendar[]>(
				`/films/calendar`,
				{
					params: { count: limit, offset },
				},
			);

			dispatch(returnCalendarAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnCalendarErrorAction(errorMessage));
		}
	};

export default {
	getCalendarAction,
};
