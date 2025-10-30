import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFilmPage } from '@/types/models';

/**
 * Селектор для получения списка фильма
 */
export const selectFilm: Selector = (state: State): ModelsFilmPage =>
	state.film.film;

export const selectFilmError: Selector = (state: State): string | null =>
	state.film.error;
