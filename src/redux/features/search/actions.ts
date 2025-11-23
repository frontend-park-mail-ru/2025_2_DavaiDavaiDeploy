import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsSearchResponse } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Устанавливает состояние загрузки результата поиска
 */
const setSearchResultLoadingAction = (): Action => {
	return {
		type: actionTypes.SEARCH_LOADING,
	};
};

/**
 * Возвращает успешно загруженный результат поиска
 */
const returnSearchResultAction = (data: ModelsSearchResponse): Action => {
	return {
		type: actionTypes.SEARCH_LOADED,
		payload: { result: data },
	};
};

/**
 * Устанавливает состояние ошибки при загрузке результата поиска
 */
const returnSearchResultErrorAction = (error: string): Action => {
	return {
		type: actionTypes.SEARCH_ERROR,
		payload: { error },
	};
};

/**
 * Загружает результат поиска
 */
const getSearchResultAction =
	(searchText: string): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setSearchResultLoadingAction());

		try {
			const response = await HTTPClient.get<ModelsSearchResponse>(`/search`, {
				params: { g: searchText },
			});

			dispatch(returnSearchResultAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnSearchResultErrorAction(errorMessage));
		}
	};

export default {
	getSearchResultAction,
};
