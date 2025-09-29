import { rating as ratingConsts } from '../../consts/raiting.js'

/**
 * Определяет тип рейтинга: высокий, средний или низкий.
 *
 * @param {number} rating - Числовое значение рейтинга.
 * @returns {string} Тип рейтинга (например, "high", "medium", "low").
 */
export const getRatingType = rating => {
	if (rating >= 8) {
		return ratingConsts.high
	}
	if (rating >= 5) {
		return ratingConsts.medium
	}
	return ratingConsts.low
}
