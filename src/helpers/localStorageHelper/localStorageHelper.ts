/**
 * Вспомогательный класс для работы с localStorage.
 * Предоставляет безопасные методы для сохранения, получения и удаления данных.
 * @class
 */
class LocalStorageHelper {
	/**
	 * Сохраняет значение в localStorage.
	 * @static
	 * @param {string} key - Ключ для сохранения.
	 * @param {string} value - Значение для сохранения.
	 * @throws {Error} Выбрасывает ошибку, если localStorage недоступен.
	 */
	static setItem(key: string, value: string): void {
		try {
			localStorage.setItem(key, value)
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error('LocalStorage is not available: ' + e.message)
			} else {
				throw new Error('LocalStorage is not available')
			}
		}
	}

	/**
	 * Получает значение из localStorage.
	 * @static
	 * @param {string} key - Ключ для получения значения.
	 * @returns {string | null} Значение или null, если ключ не найден.
	 * @throws {Error} Выбрасывает ошибку, если localStorage недоступен.
	 */
	static getItem(key: string): string | null {
		try {
			return localStorage.getItem(key)
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error('LocalStorage is not available: ' + e.message)
			} else {
				throw new Error('LocalStorage is not available')
			}
		}
	}

	/**
	 * Удаляет значение из localStorage.
	 * @static
	 * @param {string} key - Ключ для удаления.
	 * @throws {Error} Выбрасывает ошибку, если localStorage недоступен.
	 */
	static removeItem(key: string): void {
		try {
			localStorage.removeItem(key)
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error('LocalStorage is not available: ' + e.message)
			} else {
				throw new Error('LocalStorage is not available')
			}
		}
	}
}

export default LocalStorageHelper
