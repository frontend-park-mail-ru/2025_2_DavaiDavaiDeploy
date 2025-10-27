import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsGenre } from '@/types/models';

export const selectGenres: Selector = (state: State): ModelsGenre[] =>
	state.genre.genres;
