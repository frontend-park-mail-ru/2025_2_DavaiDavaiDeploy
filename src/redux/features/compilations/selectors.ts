import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsCompFilm, ModelsCompilation } from '@/types/models';

export const selectCompilations: Selector = (
	state: State,
): ModelsCompilation[] => state.compilation.compilations;

export const selectCompilation: Selector = (
	state: State,
): ModelsCompilation | null => state.compilation.curCompilation;

export const selectCompilationFilms: Selector = (
	state: State,
): ModelsCompFilm[] => state.compilation.compilationFilms;

export const selectCompilationFilmsError: Selector = (
	state: State,
): string | null => state.compilation.compilationFilmsError;
