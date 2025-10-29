import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFilmPage } from '@/types/models';
import actionTypes from './actionTypes';

/**
 * Action: начало загрузки фильмов.
 */
const setFilmLoadingAction = (): Action => {
	return {
		type: actionTypes.FILM_LOADING,
	};
};

/**
 * Action: успешная загрузка фильмов.
 *
 */
const returnFilmAction = (data: ModelsFilmPage): Action => {
	return {
		type: actionTypes.FILM_LOADED,
		payload: { film: data },
	};
};

/**
 * Action: ошибка при загрузке фильмов.
 */
const returnFilmErrorAction = (error: string): Action => {
	return {
		type: actionTypes.FILM_ERROR,
		payload: { film: {}, error: error },
	};
};

/**
 * Thunk: асинхронная загрузка фильмов с сервера.
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

export default {
	getFilmAction,
	setFilmLoadingAction,
	returnFilmAction,
	returnFilmErrorAction,
};
