export const getGridColumnCount = gridElement => {
	if (!gridElement) {
		return 0
	}
	const style = window.getComputedStyle(gridElement)
	const columns = style.getPropertyValue('grid-template-columns')
	return columns.split(' ').length
}
