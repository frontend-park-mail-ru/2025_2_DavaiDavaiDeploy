import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFavFilm } from '@/types/models';
import * as Sentry from '@sentry/browser';
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
		const response = await HTTPClient.get<ModelsFavFilm[]>('/users/saved');

		dispatch(returnFavoritesAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnFavoritesErrorAction(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки избранного'), {
			tags: {
				category: 'favorites',
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
const processDeleteAction = (films: ModelsFavFilm[]): Action => {
	return {
		type: actionTypes.DELETE_FROM_FAVORITES,
		payload: { films },
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
			const response = await HTTPClient.delete<ModelsFavFilm[]>(
				`/films/${id}/remove`,
			);

			dispatch(processDeleteAction(response.data));
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

export default {
	getFavoritesAction,
	deleteFromFavoritesAction,
};
