import { serverAddr } from '@/consts/serverAddr'
import { HTTPClient } from './HTTPClient'

/**
 * Таймаут для HTTP-запросов в миллисекундах.
 * @constant {number}
 */
const TIMEOUT = 1000

/**
 * Настроенный экземпляр HTTP-клиента для работы с API.
 * @type {HTTPClient}
 */
export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: {},
	timeout: TIMEOUT,
})
