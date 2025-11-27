import HTTPClient from '@/modules/HTTPClient';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type {
	ModelsSearchResponse,
	ModelsVoiceSearchResponse,
} from '@/types/models';
import * as Sentry from '@sentry/browser';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Возвращает успешно загруженный результат голосового поиска
 */
const returnVoiceSearchResultAction = (
	data: ModelsVoiceSearchResponse,
): Action => {
	return {
		type: actionTypes.VOICE_SEARCH_LOADED,
		payload: { result: data },
	};
};

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
				params: { q: searchText },
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

			Sentry.captureException(new Error('Ошибка ручки поиска'), {
				tags: {
					category: 'search',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

/**
 * Очищает результат поиска
 */
const clearSearchResultAction = (): Action => {
	return {
		type: actionTypes.CLEAR_SEARCH_RESULT,
	};
};

/**
 * Очищает результат голосового поиска
 */
const clearVoiceSearchResultAction = (): Action => {
	return {
		type: actionTypes.CLEAR_VOICE_SEARCH_RESULT,
	};
};

/**
 * Загружает результат голосового поиска
 */
const getVoiceSearchResultAction =
	(searchWAV: Blob): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setSearchResultLoadingAction());

		try {
			const response = await HTTPClient.post<ModelsVoiceSearchResponse>(
				`/voice-search`,
				{
					data: searchWAV,
				},
			);

			dispatch(returnVoiceSearchResultAction(response.data));
		} catch (error: unknown) {
			let errorMessage: string = DEFAULT_ERROR_MESSAGE;

			if (error instanceof Error) {
				errorMessage = error.message;
			} else if (typeof error === 'string') {
				errorMessage = error;
			}

			dispatch(returnSearchResultErrorAction(errorMessage));

			Sentry.captureException(new Error('Ошибка ручки голосового поиска'), {
				tags: {
					category: 'voiceSearch',
				},
				extra: {
					error: errorMessage,
				},
			});
		}
	};

export default {
	getVoiceSearchResultAction,
	getSearchResultAction,
	clearSearchResultAction,
	clearVoiceSearchResultAction,
};
