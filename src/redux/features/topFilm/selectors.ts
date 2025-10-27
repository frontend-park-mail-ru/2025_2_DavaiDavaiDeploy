import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsTopFilm } from '@/types/models';

/**
 * Селектор для получения фильма из состояния.
 */
export const selectTopFilm: Selector = (state: State): ModelsTopFilm =>
	state.topFilm.film;
