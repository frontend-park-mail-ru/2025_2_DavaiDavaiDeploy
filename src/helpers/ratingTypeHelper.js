export const getRatingType = rating => {
	if (rating >= 8) {
		return 'high'
	}
	if (rating >= 5) {
		return 'medium'
	}
	return 'low'
}
