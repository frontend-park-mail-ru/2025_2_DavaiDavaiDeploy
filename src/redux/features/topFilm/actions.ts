import actionTypes from './actionTypes';
import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsPromoFilm } from '@/types/models';

/**
 * Action: начало загрузки фильмов.
 */
const setTopFilmLoadingAction = (): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADING,
	};
};

/**
 * Action: успешная загрузка фильма.
 *
 */
const returnTopFilmAction = (data: ModelsPromoFilm): Action => {
	return {
		type: actionTypes.TOP_FILM_LOADED,
		payload: { film: data },
	};
};

/**
 * Action: ошибка при загрузке фильма.
 */
const returnTopFilmErrorAction = (error: string): Action => {
	return {
		type: actionTypes.TOP_FILM_ERROR,
		payload: { film: {}, error: error },
	};
};

/**
 * Thunk: асинхронная загрузка фильма с сервера.
 */
const getTopFilmAction: Action = () => async (dispatch: Dispatch) => {
	dispatch(setTopFilmLoadingAction());

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

	dispatch(returnTopFilmAction(film));
};

export default {
	getTopFilmAction,
	setTopFilmLoadingAction,
	returnTopFilmAction,
	returnTopFilmErrorAction,
};
