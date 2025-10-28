import { HTTPClient } from './HTTPClient';
import { serverAddr } from '@/consts/serverAddr';

/**
 * Таймаут для HTTP-запросов в миллисекундах.
 * @constant {number}
 */
const TIMEOUT = 1000;

/**
 * Настроенный экземпляр HTTP-клиента для работы с API.
 */
export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: {},
	timeout: TIMEOUT,
});
