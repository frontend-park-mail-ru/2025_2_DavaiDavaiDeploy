import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFilmFeedback, ModelsFilmPage } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

interface ExtendedFilmFeedback extends ModelsFilmFeedback {
	new_film_rating: number;
}

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
	}
};

/**
 * Thunk: асинхронная загрузка фильма с сервера.
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
		}
	};

const returnNewRatingAction = (data: ExtendedFilmFeedback): Action => {
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
			const response = await HTTPClient.post<ExtendedFilmFeedback>(
				`/films/${id}/Rating`,
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
		}
	};

export default {
	getFilmAction,
	getFeedbacksAction,
	setFilmLoadingAction,
	returnFilmAction,
	returnFilmErrorAction,
	clearFilmAction,
	setFeedbacksLoadingAction,
	returnFeedbacksAction,
	returnFeedbacksErrorAction,
	createRatingAction,
	returnNewRatingAction,
	returnNewRatingErrorAction,
	createFeedbackAction,
};
