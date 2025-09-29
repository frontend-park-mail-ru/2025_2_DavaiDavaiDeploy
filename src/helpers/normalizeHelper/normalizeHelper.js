/**
 * Нормализует путь, убирая дублирующиеся слэши и удаляя завершающий слэш (кроме корневого "/").
 *
 * @param {string} path - Исходный путь.
 * @returns {string} Нормализованный путь.
 */
export const normalize = path => {
	let normalized = path.replace(/\/+/g, '/')
	if (normalized !== '/' && normalized.endsWith('/')) {
		normalized = normalized.slice(0, -1)
	}
	return normalized
}
