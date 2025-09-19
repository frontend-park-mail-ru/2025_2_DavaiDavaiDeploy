export const normalize = path => {
	let normalized = path.replace(/\/+/g, '/')
	if (normalized !== '/' && normalized.endsWith('/')) {
		normalized = normalized.slice(0, -1)
	}
	return normalized
}
