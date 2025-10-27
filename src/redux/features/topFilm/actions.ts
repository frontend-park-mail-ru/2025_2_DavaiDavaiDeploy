import type { Action, Dispatch } from '@/modules/redux/types/actions';
import type { ModelsTopFilm } from '@/types/models';
import actionTypes from './actionTypes';

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
const returnTopFilmAction = (data: ModelsTopFilm): Action => {
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
	// try {
	// 	const response = await HTTPClient.get<ModelsTopFilm>('/films');
	// 	dispatch(returnTopFilmAction(response.data));
	// } catch (error: unknown) {
	// 	let errorMessage: string = 'Произошла ошибка';

	// 	if (error instanceof Error) {
	// 		errorMessage = error.message;
	// 	} else if (typeof error === 'string') {
	// 		errorMessage = error;
	// 	}

	// 	dispatch(returnTopFilmErrorAction(errorMessage));
	// }

	const film: ModelsTopFilm = {
		id: '2',
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
