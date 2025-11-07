/**
 * Поддерживаемые HTTP-методы
 * @constant {Object}
 * @property {string} GET - Метод GET
 * @property {string} POST - Метод POST
 * @property {string} PUT - Метод PUT
 * @property {string} DELETE - Метод DELETE
 */
export const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const;

// Тип для значений
export type Method = (typeof METHODS)[keyof typeof METHODS];
