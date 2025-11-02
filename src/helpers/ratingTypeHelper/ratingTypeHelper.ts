import type { RatingTypes } from '@/consts/rating';
import { RatingValues } from '@/consts/rating';

/**
 * Определяет тип рейтинга: высокий, средний или низкий.
 */
export const getRatingType = (
	rating: number | undefined | null,
): RatingTypes | null => {
	if (!rating) {
		return null;
	}

	if (rating >= 8) {
		return RatingValues.High;
	}

	if (rating >= 5) {
		return RatingValues.Medium;
	}

	return RatingValues.Low;
};
