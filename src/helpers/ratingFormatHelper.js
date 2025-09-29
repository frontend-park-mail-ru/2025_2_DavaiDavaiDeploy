/**
 * Форматирует числовой рейтинг до одного знака после запятой.
 *
 * @param {number} rating - Рейтинг (например, 7.456).
 * @returns {string} Отформатированный рейтинг (например, "7.5").
 */
export const formatRating = rating => {
	return rating.toFixed(1)
}
