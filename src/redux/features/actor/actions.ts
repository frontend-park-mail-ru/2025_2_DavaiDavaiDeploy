import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsActorPage, ModelsMainPageFilm } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Устанавливает состояние загрузки страницы актера
 */
const setActorLoadingAction = (): Action => {
	return {
		type: actionTypes.ACTOR_LOADING,
	};
};

/**
 * Устанавливает состояние загрузки фильмов актера
 */
const setActorFilmsLoadingAction = (): Action => {
	return {
		type: actionTypes.ACTOR_FILMS_LOADING,
	};
};

/**
 * Возвращает успешно загруженные данные актера
 */
const returnActorAction = (data: ModelsActorPage): Action => {
	return {
		type: actionTypes.ACTOR_LOADED,
		payload: { actor: data },
	};
};

/**
 * Возвращает успешно загруженные фильмы актера
 */
const returnActorFilmsAction = (data: ModelsMainPageFilm[]): Action => {
	return {
		type: actionTypes.ACTOR_FILMS_LOADED,
		payload: { films: data },
	};
};

/**
 * Устанавливает состояние ошибки при загрузке данных актера
 */
const returnActorErrorAction = (error: string): Action => {
	return {
		type: actionTypes.ACTOR_ERROR,
		payload: { error },
	};
};

/**
 * Устанавливает состояние ошибки при загрузке фильмов актера
 */
const returnActorFilmsErrorAction = (error: string): Action => {
	return {
		type: actionTypes.ACTOR_FILMS_ERROR,
		payload: { error },
	};
};

/**
 * Загружает данные актера по ID
 */
const getActorAction =
	(id: string | number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setActorLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsActorPage>(`/actors/${id}`);
			dispatch(returnActorAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnActorErrorAction(errorMessage));
		}
	};

/**
 * Загружает фильмы актера с пагинацией
 */
const getActorFilmsAction =
	(id: string | number, limit: number, offset: number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setActorFilmsLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsMainPageFilm[]>(
				`/actors/${id}/films`,
				{
					params: { count: limit, offset },
				},
			);

			dispatch(returnActorFilmsAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnActorFilmsErrorAction(errorMessage));
		}
	};

export default {
	getActorAction,
	getActorFilmsAction,
	setActorLoadingAction,
	setActorFilmsLoadingAction,
	returnActorAction,
	returnActorFilmsAction,
	returnActorErrorAction,
	returnActorFilmsErrorAction,
};
