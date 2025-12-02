import { serverAddr } from '@/consts/serverAddr';
import getCSRFromLocalStorage from '@/helpers/getCSRFromLocalStorage/getCSRFromLocalStorage.ts';
import { HTTPClient } from './HTTPClient';

/**
 * Таймаут для HTTP-запросов в миллисекундах.
 * @constant {number}
 */
const TIMEOUT = 10000;

/**
 * Настроенный экземпляр HTTP-клиента для работы с API.
 */
export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: { 'X-CSRF-Token': () => getCSRFromLocalStorage() },
	timeout: TIMEOUT,
});
