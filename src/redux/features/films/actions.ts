import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsMainPageFilm } from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

/**
 * Action: начало загрузки фильмов.
 */
const setFilmsLoadingAction = (): Action => {
	return {
		type: actionTypes.FILMS_LOADING,
	};
};

/**
 * Action: успешная загрузка фильмов.
 *
 */
const returnFilmsAction = (data: ModelsMainPageFilm[]): Action => {
	return {
		type: actionTypes.FILMS_LOADED,
		payload: { films: data },
	};
};

/**
 * Action: ошибка при загрузке фильмов.
 */
const returnFilmsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.FILMS_ERROR,
		payload: { films: [], error: error },
	};
};

/**
 * Action: очистка фильмов.
 */
const clearFilmsAction = (): Action => {
	return {
		type: actionTypes.FILMS_CLEAR,
	};
};

/**
 * Thunk: асинхронная загрузка фильмов с сервера.
 */
const getFilmsAction: Action =
	(limit: number, offset: number) => async (dispatch: Dispatch) => {
		dispatch(setFilmsLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsMainPageFilm[]>('/films/', {
				params: { count: limit, offset },
			});

			dispatch(returnFilmsAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = 'Произошла ошибка';

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnFilmsErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки фильмов'), {
				tags: {
					category: 'films',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
	clearFilmsAction,
};
