import { combineReducers } from '@/modules/redux/index';
import counterReducer from './counter/reducers';
import filmReducer from './film/reducers';
import genreReducer from './genre/reducers';
import topFilmReducer from './topFilm/reducers';
import userReducer from './user/reducers';

/**
 * Главный редьюсер приложения, объединяющий все feature-редьюсеры.
 * @type {Function}
 */
export const reducer = combineReducers({
	counter: counterReducer,
	film: filmReducer,
	user: userReducer,
	genre: genreReducer,
	topFilm: topFilmReducer,
});
