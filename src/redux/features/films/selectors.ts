import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsMainPageFilm } from '@/types/models';

/**
 * Селектор для получения фильма.
 */
export const selectFilms: Selector = (
	state: State,
): ModelsMainPageFilm[] | null => state.films.films;

export const selectFilmsError: Selector = (state: State): string | null =>
	state.films.error;

export const selectCursor: Selector = (state: State): string | null =>
	state.films.cursor;

export const selectRecommendations: Selector = (
	state: State,
): ModelsMainPageFilm[] | null => state.films.recommendations;
