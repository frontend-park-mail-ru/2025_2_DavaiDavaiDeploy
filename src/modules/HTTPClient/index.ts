import { serverAddr } from '@/consts/serverAddr';
import getCSRFromLocalStorage from '@/helpers/getCSRFromLocalStorage/getCSRFromLocalStorage.ts';
import { HTTPClient } from './HTTPClient';

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
	headers: {
		'X-Csrf-Token': getCSRFromLocalStorage(),
	},
	timeout: TIMEOUT,
});
