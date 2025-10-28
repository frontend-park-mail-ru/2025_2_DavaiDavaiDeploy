import counterReducer from './counter/reducers';
import filmReducer from './film/reducers';
import filmsReducer from './films/reducers';
import genreReducer from './genre/reducers';
import topFilmReducer from './topFilm/reducers';
import userReducer from './user/reducers';
import { combineReducers } from '@/modules/redux';

/**
 * Главный редьюсер приложения, объединяющий все feature-редьюсеры.
 * @type {Function}
 */
export const reducer = combineReducers({
	counter: counterReducer,
	films: filmsReducer,
	film: filmReducer,
	user: userReducer,
	genre: genreReducer,
	topFilm: topFilmReducer,
});
