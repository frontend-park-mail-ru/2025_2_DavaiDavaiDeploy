export const getGridColumnCount = gridElement => {
	if (!gridElement) {
		return 0
	}
	const style = window.getComputedStyle(gridElement)
	const columns = style.getPropertyValue('grid-template-columns').trim()
	return columns.split(/\s+/).length
}
