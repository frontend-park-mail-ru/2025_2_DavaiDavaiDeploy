import { serverAddr } from '@/consts/serverAddr';
import { HTTPClient } from './HTTPClient';

/**
 * Таймаут для HTTP-запросов в миллисекундах.
 * @constant {number}
 */
const TIMEOUT = 2500;

/**
 * Настроенный экземпляр HTTP-клиента для работы с API.
 */
export default HTTPClient.create({
	baseUrl: serverAddr,
	timeout: TIMEOUT,
});
