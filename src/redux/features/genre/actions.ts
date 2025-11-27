import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsGenre, ModelsMainPageFilm } from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const clearGenreAction = (): Action => {
	return {
		type: actionTypes.CLEAR_GENRE,
	};
};

/**
 * Action: устанавливает состояние загрузки для жанра
 */
const setGenreLoadingAction = (): Action => {
	return {
		type: actionTypes.GENRE_LOADING,
	};
};

/**
 * Action: устанавливает состояние загрузки для списка жанров
 */
const setGenresLoadingAction = (): Action => {
	return {
		type: actionTypes.GENRES_LOADING,
	};
};

/**
 * Action: устанавливает состояние загрузки для фильмов жанра
 */
const setGenreFilmsLoadingAction = (): Action => {
	return {
		type: actionTypes.GENRE_FILMS_LOADING,
	};
};

/**
 * Action: устанавливает успешно загруженные данные жанра
 *  {Object} data - Данные жанра
 */
const returnGenreAction = (data: ModelsGenre): Action => {
	return {
		type: actionTypes.GENRE_LOADED,
		payload: { genre: data },
	};
};

/**
 * Action: устанавливает успешно загруженные фильмы жанра
 */
const returnGenreFilmsAction = (data: ModelsMainPageFilm[]): Action => {
	return {
		type: actionTypes.GENRE_FILMS_LOADED,
		payload: { films: data },
	};
};

/**
 * Action: устанавливает успешно загруженный список жанров
 */
const returnGenresAction = (data: ModelsGenre[]): Action => {
	return {
		type: actionTypes.GENRES_LOADED,
		payload: { genres: data },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций с конкретным жанром
 */
const returnGenreErrorAction = (error: string): Action => {
	return {
		type: actionTypes.GENRE_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций со списком жанров
 */
const returnGenresErrorAction = (error: string): Action => {
	return {
		type: actionTypes.GENRES_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: устанавливает состояние ошибки для операций с фильмами жанра
 */
const returnGenreFilmsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.GENRE_FILMS_ERROR,
		payload: { error: error },
	};
};

/**
 * Action: получает данные жанра по ID
 */
const getGenreAction =
	(id: string | number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setGenreLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsGenre>(`/test/genres/${id}`);
			dispatch(returnGenreAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnGenreErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки жанра'), {
				tags: {
					category: 'genre',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

/**
 * Action: получает список всех жанров
 */
const getGenresAction = (): Action => async (dispatch: Dispatch) => {
	dispatch(setGenresLoadingAction());

	try {
		const response = await HTTPClient.get<ModelsGenre[]>('/test/genres/', {
			params: { count: 24, offset: 0 },
		});

		dispatch(returnGenresAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnGenresErrorAction(errorMessage));

		Sentry.captureException(new Error('Ошибка ручки жанров'), {
			tags: {
				category: 'genres',
			},
			extra: {
				error: errorMessage,
			},
		});
	}
};

/**
 * Action: получает фильмы по жанру
 */
const getGenreFilmsAction =
	(limit: number, offset: number, id: string | number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setGenreFilmsLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsMainPageFilm[]>(
				`/test/genres/${id}/films`,
				{
					params: { count: limit, offset },
				},
			);

			dispatch(returnGenreFilmsAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnGenreFilmsErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки фильмов жанра'), {
				tags: {
					category: 'genreFilms',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

export default {
	getGenreAction,
	getGenresAction,
	getGenreFilmsAction,
	setGenreLoadingAction,
	setGenresLoadingAction,
	setGenreFilmsLoadingAction,
	returnGenreAction,
	returnGenresAction,
	returnGenreFilmsAction,
	returnGenreErrorAction,
	returnGenresErrorAction,
	returnGenreFilmsErrorAction,
	clearGenreAction,
};
