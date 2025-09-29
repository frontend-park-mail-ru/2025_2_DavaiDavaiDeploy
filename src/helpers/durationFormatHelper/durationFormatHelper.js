/**
 * Преобразует продолжительность в минутах в строку формата "Xч Ym".
 *
 * @param {number} minutes - Общее количество минут.
 * @returns {string} Отформатированная строка с часами и минутами (например, "2ч 15м").
 */
export const formatDuration = minutes => {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	return `${hours}ч ${mins}м`
}
