import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type {
	ModelsFilmFeedback,
	ModelsFilmPage,
	ModelsMainPageFilm,
} from '@/types/models';

/**
 * Селектор для получения списка фильма
 */
export const selectFilm: Selector = (state: State): ModelsFilmPage =>
	state.film.film;

export const selectFilmError: Selector = (state: State): string | null =>
	state.film.filmError;

export const selectFeedbacks: Selector = (state: State): ModelsFilmFeedback[] =>
	state.film.feedbacks;

export const selectFeedbackError: Selector = (state: State): string | null =>
	state.film.feedbackError;

export const selectUserRating: Selector = (state: State): number | null =>
	state.film.userRating;

export const selectUserFeedback: Selector = (
	state: State,
): ModelsFilmFeedback | null => state.film.userFeedback;

export const selectIsOut: Selector = (state: State): boolean | null =>
	state.film.film && state.film.film.is_out;

export const selectFilmLoading: Selector = (state: State): boolean =>
	state.film.filmLoading;

export const selectFilmFeedbacksLoading: Selector = (state: State): boolean =>
	state.film.feedbackLoading;

export const selectSimilarFilms: Selector = (
	state: State,
): ModelsMainPageFilm[] | null => state.film.similarFilms;

export const selectSimilarFilmsLoading: Selector = (state: State): boolean =>
	state.film.similarLoading;
