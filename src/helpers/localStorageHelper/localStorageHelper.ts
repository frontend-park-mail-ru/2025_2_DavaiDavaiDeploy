const LOCAL_STORAGE_ERROR = 'LocalStorage is not available';

/**
 * Вспомогательный класс для работы с localStorage.
 * Предоставляет безопасные методы для сохранения, получения и удаления данных.
 * @class
 */
class LocalStorageHelper {
	/**
	 * Сохраняет значение в localStorage.
	 */
	static setItem(key: string, value: string) {
		try {
			localStorage.setItem(key, value);
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error(`${LOCAL_STORAGE_ERROR}: ${e.message}`);
			} else {
				throw new Error(LOCAL_STORAGE_ERROR);
			}
		}
	}

	/**
	 * Получает значение из localStorage.
	 */
	static getItem(key: string): string | null {
		try {
			return localStorage.getItem(key);
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error(`${LOCAL_STORAGE_ERROR}: ${e.message}`);
			} else {
				throw new Error(LOCAL_STORAGE_ERROR);
			}
		}
	}

	/**
	 * Удаляет значение из localStorage.
	 */
	static removeItem(key: string) {
		try {
			localStorage.removeItem(key);
		} catch (e: unknown) {
			if (e instanceof Error) {
				throw new Error(`${LOCAL_STORAGE_ERROR}: ${e.message}`);
			} else {
				throw new Error(LOCAL_STORAGE_ERROR);
			}
		}
	}
}

export default LocalStorageHelper;
