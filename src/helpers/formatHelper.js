export const formatDuration = minutes => {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	return `${hours}ч ${mins}м`
}
