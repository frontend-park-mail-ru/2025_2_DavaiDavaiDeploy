import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFavFilm } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Устанавливает состояние загрузки избранных фильмов
 */
const setFavoritesLoadingAction = (): Action => {
	return {
		type: actionTypes.FAVORITES_LOADING,
	};
};

/**
 * Возвращает успешно загруженные избранные фильмы
 */
const returnFavoritesAction = (data: ModelsFavFilm[]): Action => {
	return {
		type: actionTypes.FAVORITES_LOADED,
		payload: { favorites: data },
	};
};

/**
 * Возвращает ошибку загрузки избранных фильмов
 */
const returnFavoritesErrorAction = (error: string): Action => {
	return {
		type: actionTypes.FAVORITES_ERROR,
		payload: { error: error },
	};
};

/**
 * Загружает избранные фильмы
 */
const getFavoritesAction = (): Action => async (dispatch: Dispatch) => {
	dispatch(setFavoritesLoadingAction());

	try {
		const response = await HTTPClient.get<ModelsFavFilm[]>('/films/favorites');

		dispatch(returnFavoritesAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnFavoritesErrorAction(errorMessage));
	}
};

export default {
	getFavoritesAction,
};
