import { isProduction } from './ isProduction'

/**
 * Базовый URL API сервера в зависимости от окружения.
 * @constant {string}
 */
export const serverAddr = isProduction
	? 'https://ddfilms.online/api'
	: 'http://localhost:5458/api'

/**
 * Базовый URL для статических ресурсов в зависимости от окружения.
 * @constant {string}
 */
export const serverAddrForStatic = isProduction
	? 'https://ddfilms.online'
	: 'http://localhost:5458'
