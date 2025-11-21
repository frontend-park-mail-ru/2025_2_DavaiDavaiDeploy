import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsFilmInCalendar } from '@/types/models';
import actionTypes from './actionTypes';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

/**
 * Устанавливает состояние загрузки календаря
 */
const setCalendarLoadingAction = (): Action => {
	return {
		type: actionTypes.CALENDAR_LOADING,
	};
};

/**
 * Возвращает успешно загруженные данные календаря
 */
const returnCalendarAction = (data: ModelsFilmInCalendar[]): Action => {
	return {
		type: actionTypes.CALENDAR_LOADED,
		payload: { calendar: data },
	};
};

/**
 * Устанавливает состояние ошибки при загрузке данных календаря
 */
const returnCalendarErrorAction = (error: string): Action => {
	return {
		type: actionTypes.CALENDAR_ERROR,
		payload: { error },
	};
};

/**
 * Загружает фильмы календаря с пагинацией
 */
const getCalendarAction =
	(limit: number, offset: number): Action =>
	async (dispatch: Dispatch) => {
		dispatch(setCalendarLoadingAction());

		// try {
		// 	const response = await HTTPClient.get<ModelsFilmInCalendar[]>(
		// 		`/films/calendar`,
		// 		{
		// 			params: { count: limit, offset },
		// 		},
		// 	);

		// 	dispatch(returnCalendarAction(response.data));
		// } catch (error: unknown) {
		// 	let errorMessage: string = DEFAULT_ERROR_MESSAGE;

		// 	if (error instanceof Error) {
		// 		errorMessage = error.message;
		// 	} else if (typeof error === 'string') {
		// 		errorMessage = error;
		// 	}

		// 	dispatch(returnCalendarErrorAction(errorMessage));
		// }

		const films: ModelsFilmInCalendar[] = [
			{
				cover: 'films/pic49.png',
				id: '1',
				is_liked: true,
				original_title: 'The Matrix',
				release_date: '1999-03-31',
				short_description:
					'A computer hacker learns about the true nature of reality',
				title: 'Матрица',
			},
			{
				cover: 'films/pic49.png',
				id: '2',
				is_liked: false,
				original_title: 'Inception',
				release_date: '2010-07-16',
				short_description:
					'A thief who steals corporate secrets through dream-sharing technology',
				title: 'Начало',
			},
			{
				cover: 'films/pic49.png',
				id: '3',
				is_liked: true,
				release_date: '2022-12-15',
				short_description: 'Путешествие в неизведанные миры',
				title: 'Аватар: Путь воды',
			},
			{
				cover: 'films/pic49.png',
				id: '4',
				is_liked: false,
				original_title: 'Interstellar',
				release_date: '2014-11-07',
				title: 'Интерстеллар',
			},
			{
				cover: 'films/pic49.png',
				id: '5',
				is_liked: true,
				release_date: '2023-05-25',
				short_description: 'Приключения в галактике',
				title: 'Стражи Галактики: Часть 3',
			},
			{
				cover: 'films/pic49.png',
				id: '6',
				is_liked: true,
				release_date: '2023-05-25',
				short_description: 'Приключения в галактике',
				title: 'Стражи Галактики: Часть 3',
			},
		];

		dispatch(returnCalendarAction(films));
	};

export default {
	getCalendarAction,
};
