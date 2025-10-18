import type { State } from '@/modules/redux/ReduxTypes'

/**
 * Селектор для получения всей секции жанров из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {Object} Объект с данными о жанрах (genres, loading, error и т.д.).
 */
export const selectGenreSection = (state: State) => state.genre
