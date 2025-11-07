import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsPromoFilm } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Action: начало загрузки фильмов.
 */
const setPromoFilmLoadingAction = (): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADING,
	};
};

/**
 * Action: успешная загрузка фильма.
 *
 */
const returnPromoFilmAction = (data: ModelsPromoFilm): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADED,
		payload: { film: data },
	};
};

/**
 * Action: ошибка при загрузке фильма.
 */
const returnPromoFilmErrorAction = (error: string): Action => {
	return {
		type: actionTypes.TOP_FILM_ERROR,
		payload: { film: {}, error: error },
	};
};

/**
 * Thunk: асинхронная загрузка фильма с сервера.
 */
const getPromoFilmAction: Action = () => async (dispatch: Dispatch) => {
	dispatch(setPromoFilmLoadingAction());

	try {
		const response = await HTTPClient.get<ModelsPromoFilm>(`/films/promo`);

		dispatch(returnPromoFilmAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnPromoFilmErrorAction(errorMessage));
	}
};

export default {
	getPromoFilmAction,
	setPromoFilmLoadingAction,
	returnPromoFilmAction,
	returnPromoFilmErrorAction,
};
