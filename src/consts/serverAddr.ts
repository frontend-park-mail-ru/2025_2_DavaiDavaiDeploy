/**
 * Базовый URL API сервера в зависимости от окружения.
 * @constant {string}
 */
export const serverAddr = import.meta.env.VITE_IS_PRODUCTION
	? 'https://ddfilms.online/api'
	: 'http://localhost:5458/api'

/**
 * Базовый URL для статических ресурсов в зависимости от окружения.
 * @constant {string}
 */
export const serverAddrForStatic = import.meta.env.VITE_IS_PRODUCTION
	? 'https://ddfilms.online'
	: 'http://localhost:5458'
