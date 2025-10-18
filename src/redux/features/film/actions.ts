import HTTPClient from '@/modules/HTTPClient/index'
import type { ModelsFilm } from '@/modules/HTTPClient/types/api'
import type { Dispatch } from '@/modules/redux/types/actions'
import actionTypes from './types'

/**
 * Action: начало загрузки фильмов.
 * @returns {{ type: string }}
 */
const setFilmsLoadingAction = () => {
	return {
		type: actionTypes.FILMS_LOADING,
	}
}

/**
 * Action: успешная загрузка фильмов.
 *
 * @param {Array<Object>} data - Массив фильмов.
 * @returns {{ type: string, payload: { films: Array<Object> } }}
 */
const returnFilmsAction = (data: ModelsFilm[]) => {
	return {
		type: actionTypes.FILMS_LOADED,
		payload: { films: data },
	}
}

/**
 * Action: ошибка при загрузке фильмов.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns {{ type: string, payload: { films: [], error: string } }}
 */
const returnFilmsErrorAction = (error: string) => {
	return {
		type: actionTypes.FILMS_ERROR,
		payload: { films: [], error: error },
	}
}

/**
 * Action: очистка фильмов.
 *
 * @param {string} error - Сообщение об ошибке.
 * @returns { type: string }
 */
const clearFilmsAction = () => {
	return {
		type: actionTypes.FILMS_CLEAR,
	}
}

/**
 * Thunk: асинхронная загрузка фильмов с сервера.
 *
 * @param {number} limit - Количество фильмов.
 * @param {number} offset - Смещение.
 * @returns {Function} Thunk-функция для dispatch.
 */
const getFilmsAction =
	(limit: number, offset: number) => async (dispatch: Dispatch) => {
		dispatch(setFilmsLoadingAction())
		try {
			const response = await HTTPClient.get<ModelsFilm[]>('/films', {
				params: { count: limit, offset },
			})
			dispatch(returnFilmsAction(response.data))
		} catch (error: unknown) {
			let errorMessage: string = 'Произошла ошибка'

			if (error instanceof Error) {
				errorMessage = error.message
			} else if (typeof error === 'string') {
				errorMessage = error
			}

			dispatch(returnFilmsErrorAction(errorMessage))
		}
	}

export default {
	getFilmsAction,
	setFilmsLoadingAction,
	returnFilmsAction,
	returnFilmsErrorAction,
	clearFilmsAction,
}
