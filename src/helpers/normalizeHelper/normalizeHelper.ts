/**
 * Нормализует путь, убирая дублирующиеся слэши и удаляя завершающий слэш (кроме корневого "/").
 */
export const normalize = (path: string): string => {
	let normalized = path.replace(/\/+/g, '/');
	if (normalized !== '/' && normalized.endsWith('/')) {
		normalized = normalized.slice(0, -1);
	}
	return normalized;
};
