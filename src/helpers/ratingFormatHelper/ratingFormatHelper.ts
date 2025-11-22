import { RATING_COUNT } from '@/consts/rating';

/**
 * Форматирует числовой рейтинг до одного знака после запятой.
 */
export const formatRating = (rating: number): string => {
	if (!rating) {
		return '';
	}

	if (rating === 10) {
		return rating.toString();
	}

	return rating.toFixed(1);
};

export const formatRatingForFeedback = (rating: number): string => {
	return `${rating.toFixed(0)}/${RATING_COUNT}`;
};
