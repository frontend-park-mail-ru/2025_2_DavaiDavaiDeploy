import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';

/**
 * Селектор для получения всей секции жанров из состояния.
 */
export const selectGenreSection: Selector = (state: State): State =>
	state.genre;
