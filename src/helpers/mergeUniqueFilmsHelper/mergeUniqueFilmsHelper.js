export const mergeUniqueFilms = (oldFilms, newFilms) => {
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
