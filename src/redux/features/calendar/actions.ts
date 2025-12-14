import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFavFilm, ModelsFilmInCalendar } from '@/types/models';
import * as Sentry from '@sentry/browser';
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
 * Возвращает успешно загруженные данные для календаря
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

			Sentry.captureException(new Error('Ошибка ручки календаря'), {
				tags: {
					category: 'calendar',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

/**
 * Вызов удаления фильма из избранного
 */
const processDeleteAction = (id: string): Action => {
	return {
		type: actionTypes.DELETE_FROM_FAVORITES,
		payload: { id },
	};
};

/**
 * Устанавливает состояние ошибки при удалении фильма из избранного
 */
const returnDeleteErrorAction = (error: string): Action => {
	return {
		type: actionTypes.DELETE_FROM_FAVORITES_ERROR,
		payload: { error },
	};
};

/**
 * Удаляет фильм из избранного
 */
const deleteFromFavoritesAction =
	(id: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			await HTTPClient.delete<ModelsFavFilm[]>(`/films/${id}/remove`);

			dispatch(processDeleteAction(id));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnDeleteErrorAction(errorMessage));

			Sentry.captureException(
				new Error('Ошибка ручки удаления из избранного'),
				{
					tags: {
						category: 'removeFromFav',
					},
					extra: {
						error: errorMessage,
					},
				},
			);
		}
	};

/**
 * Вызов добавления фильма из избранного
 */
const processAddAction = (id: string): Action => {
	return {
		type: actionTypes.ADD_TO_FAVORITES,
		payload: { id },
	};
};

/**
 * Устанавливает состояние ошибки при добавлении фильма в избранное
 */
const returnAddErrorAction = (error: string): Action => {
	return {
		type: actionTypes.ADD_TO_FAVORITES_ERROR,
		payload: { error },
	};
};

/**
 * Добавляет фильм в избранное
 */
const addToFavoritesAction =
	(id: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			await HTTPClient.post<ModelsFavFilm[]>(`/films/${id}/save`);

			dispatch(processAddAction(id));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnAddErrorAction(errorMessage));

			Sentry.captureException(
				new Error('Ошибка ручки добавления в избранное'),
				{
					tags: {
						category: 'addToFav',
					},
					extra: {
						error: errorMessage,
					},
				},
			);
		}
	};

export default {
	getCalendarAction,
	deleteFromFavoritesAction,
	addToFavoritesAction,
};
