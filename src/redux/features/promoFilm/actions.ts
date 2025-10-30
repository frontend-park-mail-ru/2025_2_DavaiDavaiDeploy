import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsPromoFilm } from '@/types/models';
import actionTypes from './actionTypes';

/**
 * Action: начало загрузки фильмов.
 */
const setPromoFilmLoadingAction = (): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADING,
	};
};

/**
 * Action: успешная загрузка фильма.
 *
 */
const returnPromoFilmAction = (data: ModelsPromoFilm): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADED,
		payload: { film: data },
	};
};

/**
 * Action: ошибка при загрузке фильма.
 */
const returnPromoFilmErrorAction = (error: string): Action => {
	return {
		type: actionTypes.TOP_FILM_ERROR,
		payload: { film: {}, error: error },
	};
};

/**
 * Thunk: асинхронная загрузка фильма с сервера.
 */
const getPromoFilmAction: Action = () => async (dispatch: Dispatch) => {
	dispatch(setPromoFilmLoadingAction());

	const film: ModelsPromoFilm = {
		id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
		image: '../../dune.jpg',
		title: 'Дюна: Часть вторая',
		year: 2024,
		genre: 'Фантастика',
		duration: 169,
		rating: 7.9,
		short_description:
			'Продолжение эпической саги о Поле Атрейдесе. Он продолжает путь к тому, чтобы стать МуадДибом, в то время как его враги плетут заговоры против него.',
	};

	dispatch(returnPromoFilmAction(film));
};

export default {
	getPromoFilmAction,
	setPromoFilmLoadingAction,
	returnPromoFilmAction,
	returnPromoFilmErrorAction,
};
