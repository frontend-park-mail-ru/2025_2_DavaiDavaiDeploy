import type { RatingTypes } from '@/consts/raiting';
import { RatingValues } from '@/consts/raiting';

/**
 * Определяет тип рейтинга: высокий, средний или низкий.
 */
export const getRatingType = (rating: number): RatingTypes => {
	if (rating >= 8) {
		return RatingValues.High;
	}
	if (rating >= 5) {
		return RatingValues.Medium;
	}
	return RatingValues.Low;
};
