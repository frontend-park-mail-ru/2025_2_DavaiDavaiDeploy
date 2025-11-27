import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type {
	ModelsFavFilm,
	ModelsFilmFeedback,
	ModelsFilmPage,
} from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const clearFilmAction = (): Action => {
	return {
		type: actionTypes.CLEAR_FILM,
	};
};

/**
 * Action: начало загрузки фильма.
 */
const setFilmLoadingAction = (): Action => {
	return {
		type: actionTypes.FILM_LOADING,
	};
};

/**
 * Action: начало загрузки фидбэков.
 */
const setFeedbacksLoadingAction = (): Action => {
	return {
		type: actionTypes.FEEDBACK_LOADING,
	};
};

/**
 * Action: успешная загрузка фильма.
 */
const returnFilmAction = (data: ModelsFilmPage): Action => {
	return {
		type: actionTypes.FILM_LOADED,
		payload: { film: data },
	};
};

/**
 * Action: успешное получение фидбэков.
 */
const returnFeedbacksAction = (data: ModelsFilmFeedback[]): Action => {
	return {
		type: actionTypes.FEEDBACK_LOADED,
		payload: { feedbacks: data },
	};
};

/**
 * Action: ошибка при загрузке фильма.
 */
const returnFilmErrorAction = (error: string): Action => {
	return {
		type: actionTypes.FILM_ERROR,
		payload: { film: {}, error: error },
	};
};

/**
 * Action: ошибка при загрузке фидбэков.
 */
const returnFeedbacksErrorAction = (error: string): Action => {
	return {
		type: actionTypes.FEEDBACK_ERROR,
		payload: { feedbacks: [], error: error },
	};
};

/**
 * Thunk: асинхронная загрузка фильма с сервера.
 */
const getFilmAction: Action = (id: string) => async (dispatch: Dispatch) => {
	dispatch(setFilmLoadingAction());

	try {
		const response = await HTTPClient.get<ModelsFilmPage>(`/films/${id}`);

		dispatch(returnFilmAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnFilmErrorAction(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки фильма'), {
			tags: {
				category: 'film',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

/**
 * Thunk: асинхронная загрузка отзывов с сервера.
 */
const getFeedbacksAction: Action =
	(limit: number, offset: number, id: string) => async (dispatch: Dispatch) => {
		dispatch(setFeedbacksLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsFilmFeedback[]>(
				`/films/${id}/feedbacks`,
				{ params: { count: limit, offset } },
			);

			dispatch(returnFeedbacksAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnFeedbacksErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки отзывов'), {
				tags: {
					category: 'feedbacks',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

const returnNewRatingAction = (data: ModelsFilmFeedback): Action => {
	return {
		type: actionTypes.CREATE_RATING,
		payload: { rating: data },
	};
};

const returnNewRatingErrorAction = (error: string): Action => {
	return {
		type: actionTypes.CREATE_RATING_ERROR,
		payload: { error: error },
	};
};

const createRatingAction =
	(rating: number, id: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsFilmFeedback>(
				`/films/${id}/rating`,
				{
					data: {
						rating,
					},
				},
			);

			dispatch(returnNewRatingAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnNewRatingErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки создания оценки'), {
				tags: {
					category: 'rate',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

const returnNewFeedbackAction = (data: ModelsFilmFeedback): Action => {
	return {
		type: actionTypes.CREATE_FEEDBACK,
		payload: {
			feedback: data,
		},
	};
};

const returnNewFeedbackErrorAction = (error: string): Action => {
	return {
		type: actionTypes.CREATE_FEEDBACK_ERROR,
		payload: { error },
	};
};

const createFeedbackAction =
	(rating: number, text: string, title: string, id: string): Action =>
	async (dispatch: Dispatch) => {
		try {
			const response = await HTTPClient.post<ModelsFilmFeedback>(
				`/films/${id}/feedback`,
				{
					data: {
						rating,
						text,
						title,
					},
				},
			);

			dispatch(returnNewFeedbackAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnNewFeedbackErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки создания отзыва'), {
				tags: {
					category: 'createFeedback',
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
const processDeleteAction = (): Action => {
	return {
		type: actionTypes.DELETE_FROM_FAVORITES,
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

			dispatch(processDeleteAction());
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
const processAddAction = (): Action => {
	return {
		type: actionTypes.ADD_TO_FAVORITES,
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

			dispatch(processAddAction());
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
	getFilmAction,
	getFeedbacksAction,
	addToFavoritesAction,
	deleteFromFavoritesAction,
	clearFilmAction,
	createRatingAction,
	createFeedbackAction,
};
