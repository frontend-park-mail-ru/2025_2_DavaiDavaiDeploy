import type { ModelsFilm, ModelsGenre } from '@/modules/HTTPClient/types/api';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import HTTPClient from '../../../modules/HTTPClient/index';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

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
const returnGenreFilmsAction = (data: ModelsFilm[]): Action => {
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
			const response = await HTTPClient.get<ModelsGenre>(`/genres/${id}`);
			dispatch(returnGenreAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnGenreErrorAction(errorMessage));
		}
	};

/**
 * Action: получает список всех жанров
 */
const getGenresAction = (): Action => async (dispatch: Dispatch) => {
	dispatch(setGenresLoadingAction());
	try {
		const response = await HTTPClient.get<ModelsGenre[]>('/genres');
		dispatch(returnGenresAction(response.data));
	} catch (error: unknown) {
		let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === 'string') {
			errorMessage = error;
		}

		dispatch(returnGenresErrorAction(errorMessage));
	}
};

/**
 * Action: получает фильмы по жанру
 */
const getGenreFilmsAction =
	(id: string | number, limit: number, offset: number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setGenreFilmsLoadingAction());
		try {
			const response = await HTTPClient.get<ModelsFilm[]>(
				`/films/genre/${id}`,
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
};
