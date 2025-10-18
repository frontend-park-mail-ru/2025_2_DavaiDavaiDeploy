import { RatingValues } from '@/consts/raiting'

/**
 * Определяет тип рейтинга: высокий, средний или низкий.
 *
 * @param {number} rating - Числовое значение рейтинга.
 * @returns {string} Тип рейтинга (например, "high", "medium", "low").
 */
export const getRatingType = (rating: number): string => {
	if (rating >= 8) {
		return RatingValues.High
	}
	if (rating >= 5) {
		return RatingValues.Medium
	}
	return RatingValues.Low
}
