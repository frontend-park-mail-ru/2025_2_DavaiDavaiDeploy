import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsCompFilm, ModelsCompilation } from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const clearCompilationAction = (): Action => {
	return {
		type: actionTypes.CLEAR_COMPILATION,
	};
};

/**
 * Action: устанавливает состояние загрузки для подборки
 */
const setCompilationLoadingAction = (): Action => {
	return {
		type: actionTypes.COMPILATION_LOADING,
	};
};

/**
 * Action: устанавливает состояние загрузки для списка подборок
 */
const setCompilationsLoadingAction = (): Action => {
	return {
		type: actionTypes.COMPILATIONS_LOADING,
	};
};

/**
 * Action: устанавливает состояние загрузки для фильмов подборки
 */
const setCompilationFilmsLoadingAction = (): Action => {
	return {
		type: actionTypes.COMPILATION_FILMS_LOADING,
	};
};

/**
 * Action: устанавливает успешно загруженные данные подборки
 *  {Object} data - Данные подборки
 */
const returnCompilationAction = (data: ModelsCompilation): Action => {
	return {
		type: actionTypes.COMPILATION_LOADED,
		payload: { compilation: data },
	};
};

/**
 * Action: устанавливает успешно загруженные фильмы подборки
 */
const returnCompilationFilmsAction = (data: ModelsCompFilm[]): Action => {
	return {
		type: actionTypes.COMPILATION_FILMS_LOADED,
		payload: { films: data },
	};
};

/**
 * Action: устанавливает успешно загруженный список подборок
 */
const returnCompilationsAction = (data: ModelsCompilation[]): Action => {
	return {
		type: actionTypes.COMPILATIONS_LOADED,
		payload: { compilations: data },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций с конкретной подборкой
 */
const returnCompilationErrorAction = (error: string): Action => {
	return {
		type: actionTypes.COMPILATION_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций со списком подборок
 */
const returnCompilationsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.COMPILATIONS_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций с фильмами подборки
 */
const returnCompilationFilmsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.COMPILATION_FILMS_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: получает данные подборки по ID
 */
const getCompilationAction =
	(id: string): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setCompilationLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsCompilation>(
				`/compilations/${id}`,
			);

			dispatch(returnCompilationAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnCompilationErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки подборки'), {
				tags: {
					category: 'compilation',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

/**
 * Action: получает список всех подборок
 */
const getCompilationsAction = (): Action => async (dispatch: Dispatch) => {
	dispatch(setCompilationsLoadingAction());

	try {
		const response =
			await HTTPClient.get<ModelsCompilation[]>('/compilations/');

		dispatch(returnCompilationsAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnCompilationsErrorAction(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки подборок'), {
			tags: {
				category: 'compilations',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

/**
 * Action: получает фильмы по подборке
 */
const getCompilationFilmsAction =
	(limit: number, offset: number, id: string | number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setCompilationFilmsLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsCompFilm[]>(
				`/compilations/${id}/films`,
				{
					params: { count: limit, offset },
				},
			);

			dispatch(returnCompilationFilmsAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnCompilationFilmsErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки фильмов подборки'), {
				tags: {
					category: 'compilationFilms',
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
			await HTTPClient.delete<ModelsCompFilm[]>(`/films/${id}/remove`);

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
			await HTTPClient.post<ModelsCompFilm[]>(`/films/${id}/save`);

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
	getCompilationAction,
	getCompilationsAction,
	getCompilationFilmsAction,
	clearCompilationAction,
	addToFavoritesAction,
	deleteFromFavoritesAction,
};
