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

	// try {
	// 	const response = await HTTPClient.get<ModelsFavFilm[]>('/films/favorites');

	// 	dispatch(returnFavoritesAction(response.data));
	// } catch (error: unknown) {
	// 	let errorMessage: string = DEFAULT_ERROR_MESSAGE;

	// 	if (error instanceof Error) {
	// 		errorMessage = error.message;
	// 	} else if (typeof error === 'string') {
	// 		errorMessage = error;
	// 	}

	// 	dispatch(returnFavoritesErrorAction(errorMessage));
	// }

	const favoriteFilms: ModelsFavFilm[] = [
		{
			id: '1',
			title: 'Начало',
			year: 2010,
			genre: 'Фантастика',
			duration: 148,
			rating: 8.8,
			image: 'films/pic49.png',
			short_description:
				'Профессиональный вор, специализирующийся на краже идей во время сна, получает задание внедрить идею в подсознание CEO крупной компании.',
		},
		{
			id: '2',
			title: 'Побег из Шоушенка',
			year: 1994,
			genre: 'Драма',
			duration: 142,
			rating: 9.3,
			image: 'https://example.com/images/shawshank.jpg',
			short_description:
				'Два заключенных заводят дружбу на протяжении нескольких лет, находя утешение и искупление через простые поступки.',
		},
		{
			id: '3',
			title: 'Крестный отец',
			year: 1972,
			genre: 'Криминал, Драма',
			duration: 175,
			rating: 9.2,
			image: 'https://example.com/images/godfather.jpg',
			short_description:
				'Стареющий патриарх организованной преступной династии передает контроль над своим подпольным империей своему неохотному сыну.',
		},
		{
			id: '4',
			title: 'Темный рыцарь',
			year: 2008,
			genre: 'Боевик, Криминал, Драма',
			duration: 152,
			rating: 9.0,
			image: 'https://example.com/images/dark-knight.jpg',
			short_description:
				'Когда в Готэме появляется Джокер, Бэтмен должен противостоять одному из величайших психологических и физических испытаний.',
		},
		{
			id: '5',
			title: 'Форрест Гамп',
			year: 1994,
			genre: 'Драма, Романтика',
			duration: 142,
			rating: 8.8,
			image: 'https://example.com/images/forrest-gump.jpg',
			short_description:
				'История жизни Форреста Гампа, добродушного человека с низким IQ, который невольно становится свидетелем ключевых исторических событий.',
		},
	];

	dispatch(returnFavoritesAction(favoriteFilms));
};

export default {
	getFavoritesAction,
};
