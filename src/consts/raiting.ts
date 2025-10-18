/**
 * Константы для типов рейтинга фильмов.
 * @constant {Object}
 * @property {string} high - Высокий рейтинг.
 * @property {string} medium - Средний рейтинг.
 * @property {string} low - Низкий рейтинг.
 */
export const RatingValues = {
	High: 'high',
	Medium: 'medium',
	Low: 'low',
} as const

export type RatingType = (typeof RatingValues)[keyof typeof RatingValues]
