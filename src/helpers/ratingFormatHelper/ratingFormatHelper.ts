/**
 * Форматирует числовой рейтинг до одного знака после запятой.
 */
export const formatRating = (rating: number): string => {
	if (rating === 10) {
		return rating.toString();
	}
	return rating.toFixed(1);
};
