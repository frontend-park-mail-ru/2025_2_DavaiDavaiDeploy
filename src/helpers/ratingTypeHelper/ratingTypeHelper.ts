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

	if (rating > 7) {
		return RatingValues.High;
	}

	if (rating > 4) {
		return RatingValues.Medium;
	}

	return RatingValues.Low;
};
