import type { ModelsFilm } from '@/modules/HTTPClient/types/api'

/**
 * Объединяет два массива фильмов, исключая дубликаты по ID.
 *
 * @param {ModelsFilm[]} oldFilms - Исходный массив фильмов.
 * @param {ModelsFilm[]} newFilms - Новый массив фильмов для добавления.
 * @returns {ModelsFilm[]} Объединённый массив без дубликатов.
 */
export const mergeUniqueFilms = (
	oldFilms: ModelsFilm[],
	newFilms: ModelsFilm[],
) => {
	const result = oldFilms
	const ids = new Set(oldFilms.map(film => film.id))
	for (const film of newFilms) {
		if (!ids.has(film.id)) {
			ids.add(film.id)
			result.push(film)
		}
	}
	return result
}
