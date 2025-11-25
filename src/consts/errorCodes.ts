/**
 * Константы для ошибочных кодов HTTP.
 * @constant {Object}
 * @property {number} BadRequest - Неверный запрос.
 * @property {number} Unauthorized - Неавторизованный доступ.
 * @property {number} Forbidden - Доступ запрещен.
 * @property {number} Conflict - Конфликт.
 * @property {number} InternalError - Внутренняя ошибка сервера.
 */

export const ERROR_CODES = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	CONFLICT: 409,
	PRECONDITION_FAILED: 412,
	INTERNAL_ERROR: 500,
} as const;
