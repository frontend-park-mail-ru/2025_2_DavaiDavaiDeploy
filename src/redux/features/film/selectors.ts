import type { State } from '@/modules/redux/ReduxTypes'

export const selectFilms = (state: State) => state.film.films
export const selectFilmSection = (state: State) => state.film
