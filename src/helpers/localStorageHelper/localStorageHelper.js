class LocalStorageHelper {
	static setItem(key, value) {
		try {
			localStorage.setItem(key, value)
		} catch (e) {
			throw new Error('LocalStorage is not available ' + e.message)
		}
	}

	static getItem(key) {
		try {
			return localStorage.getItem(key)
		} catch (e) {
			throw new Error('LocalStorage is not available ' + e.message)
		}
	}

	static removeItem(key) {
		try {
			localStorage.removeItem(key)
		} catch (e) {
			throw new Error('LocalStorage is not available ' + e.message)
		}
	}
}

export default LocalStorageHelper
