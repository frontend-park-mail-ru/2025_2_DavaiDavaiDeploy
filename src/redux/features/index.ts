import { combineReducers } from '@/modules/redux';
import actorReducer from './actor/reducers';
import calendarReducer from './calendar/reducers';
import compilationReducer from './compilations/reducers';
import counterReducer from './counter/reducers';
import favoritesReducer from './favorites/reducers';
import filmReducer from './film/reducers';
import filmsReducer from './films/reducers';
import genreReducer from './genre/reducers';
import promoFilmReducer from './promoFilm/reducers';
import searchReducer from './search/reducers';
import userReducer from './user/reducers';

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
	promoFilm: promoFilmReducer,
	actor: actorReducer,
	favorites: favoritesReducer,
	calendar: calendarReducer,
	search: searchReducer,
	compilation: compilationReducer,
});
