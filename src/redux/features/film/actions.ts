import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFilmFeedback, ModelsFilmPage } from '@/types/models';
import actionTypes from './actionTypes';

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
		let errorMessage: string = 'Произошла ошибка';

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
			let errorMessage: string = 'Произошла ошибка';

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnFeedbacksErrorAction(errorMessage));
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
};
