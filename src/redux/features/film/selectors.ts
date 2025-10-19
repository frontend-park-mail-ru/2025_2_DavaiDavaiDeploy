import type { ModelsFilm } from '@/modules/HTTPClient/types/api';
import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';

/**
 * Селектор для получения списка фильмов из состояния.
 */
export const selectFilms: Selector = (state: State): ModelsFilm[] =>
	state.film.films;

/**
 * Селектор для получения всей секции фильмов из состояния.
 */
export const selectFilmSection: Selector = (state: State): State => state.film;
