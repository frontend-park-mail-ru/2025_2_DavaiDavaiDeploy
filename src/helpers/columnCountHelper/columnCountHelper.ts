/**
 * Определяет количество колонок в CSS Grid-элементе.
 */
export const getGridColumnCount = (gridElement: HTMLElement): number => {
	if (!gridElement) {
		return 0;
	}

	const style = window.getComputedStyle(gridElement);
	const columns = style.getPropertyValue('grid-template-columns').trim();
	return columns.split(/\s+/).length;
};
