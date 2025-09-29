/**
 * Определяет количество колонок в CSS Grid-элементе.
 *
 * @param {HTMLElement | null} gridElement - DOM-элемент с display: grid.
 * @returns {number} Количество колонок. Возвращает 0, если элемент не передан.
 */
export const getGridColumnCount = gridElement => {
	if (!gridElement) {
		return 0
	}
	const style = window.getComputedStyle(gridElement)
	const columns = style.getPropertyValue('grid-template-columns').trim()
	return columns.split(/\s+/).length
}
