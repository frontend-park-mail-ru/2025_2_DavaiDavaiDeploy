import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFavFilm } from '@/types/models';

export const selectFavorites: Selector = (state: State): ModelsFavFilm[] =>
	state.favorites.favorites;
