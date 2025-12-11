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
const returnFilmsAction = (
	data: ModelsMainPageFilm[],
	cursor?: string,
): Action => {
	return {
		type: actionTypes.FILMS_LOADED,
		payload: { films: data, cursor },
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
	(cursor: number) => async (dispatch: Dispatch) => {
		dispatch(setFilmsLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsMainPageFilm[]>('/films/', {
				params: { cursor },
			});

			dispatch(
				returnFilmsAction(response.data, response.headers['x-next-cursor']),
			);
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

const setRecommendationsLoadingAction = (): Action => {
	return {
		type: actionTypes.RECOMMENDATIONS_LOADING,
	};
};

const returnRecommendationsAction = (data: ModelsMainPageFilm[]): Action => {
	return {
		type: actionTypes.RECOMMENDATIONS_LOADED,
		payload: { films: data },
	};
};

const returnRecommendationsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.RECOMMENDATIONS_ERROR,
		payload: { films: [], error: error },
	};
};

const getRecommendationsAction: Action = () => async (dispatch: Dispatch) => {
	dispatch(setRecommendationsLoadingAction());

	try {
		const response = await HTTPClient.get<ModelsMainPageFilm[]>(
			'/users/recommendations',
		);

		dispatch(returnRecommendationsAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = 'Произошла ошибка';

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnRecommendationsErrorAction(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки рекомендаций'), {
			tags: {
				category: 'recommendations',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

export default {
	getFilmsAction,
	getRecommendationsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
	clearFilmsAction,
};
