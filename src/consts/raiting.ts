/**
 * Константы для типов рейтинга фильмов.
 * @constant {Object}
 * @property {string} high - Высокий рейтинг.
 * @property {string} medium - Средний рейтинг.
 * @property {string} low - Низкий рейтинг.
 */
export const rating = Object.freeze({
	high: 'high',
	medium: 'medium',
	low: 'low',
} as const)

/**
 * Тип рейтинга фильма.
 * @typedef {string} Rating
 */
export type Rating = (typeof rating)[keyof typeof rating]
