/**
 * Форматирует числовой рейтинг до одного знака после запятой.
 */
export const formatRating = (rating: number): string => {
	return rating.toFixed(1)
}
