/**
 * Вспомогательный класс для работы с localStorage.
 * Предоставляет безопасные методы для сохранения, получения и удаления данных.
 * @class
 */
class LocalStorageHelper {
	/**
	 * Сохраняет значение в localStorage.
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
