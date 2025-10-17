import { rating as ratingConsts } from '@/consts/raiting'

/**
 * Определяет тип рейтинга: высокий, средний или низкий.
 *
 * @param {number} rating - Числовое значение рейтинга.
 * @returns {string} Тип рейтинга (например, "high", "medium", "low").
 */
export const getRatingType = (rating: number) => {
	if (rating >= 8) {
		return ratingConsts.high
	}
	if (rating >= 5) {
		return ratingConsts.medium
	}
	return ratingConsts.low
}
