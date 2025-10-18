import type { State } from '@/modules/redux/ReduxTypes'

/**
 * Селектор для получения списка фильмов из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {Array} Массив фильмов.
 */
export const selectFilms = (state: State) => state.film.films

/**
 * Селектор для получения всей секции фильмов из состояния.
 * @param {State} state - Состояние Redux store.
 * @returns {Object} Объект с данными о фильмах (films, loading, error).
 */
export const selectFilmSection = (state: State) => state.film
