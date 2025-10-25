import type { ModelsTopFilm } from '@/modules/HTTPClient/types/api';
import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';

/**
 * Селектор для получения фильма из состояния.
 */
export const selectTopFilm: Selector = (state: State): ModelsTopFilm[] =>
	state.topFilm.film;
