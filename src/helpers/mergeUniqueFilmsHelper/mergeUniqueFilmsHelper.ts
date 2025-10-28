import type { ModelsFilm } from '@/types/models';

/**
 * Объединяет два массива фильмов, исключая дубликаты по ID.
 */
export const mergeUniqueFilms = (
	oldFilms: ModelsFilm[],
	newFilms: ModelsFilm[],
): ModelsFilm[] => {
	const result = oldFilms;
	const ids = new Set(oldFilms.map((film) => film.id));

	for (const film of newFilms) {
		if (!ids.has(film.id)) {
			ids.add(film.id);
			result.push(film);
		}
	}

	return result;
};
