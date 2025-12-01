import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsGenre, ModelsMainPageFilm } from '@/types/models';

export const selectGenres: Selector = (state: State): ModelsGenre[] =>
	state.genre.genres;

export const selectGenre: Selector = (state: State): ModelsGenre =>
	state.genre.curGenre;

export const selectGenreError: Selector = (state: State): string | null =>
	state.genre.genreError;

export const selectGenreFilms: Selector = (
	state: State,
): ModelsMainPageFilm[] => state.genre.genreFilms;

export const selectGenreFilmsError: Selector = (state: State): string | null =>
	state.films.genreFilmsError;
