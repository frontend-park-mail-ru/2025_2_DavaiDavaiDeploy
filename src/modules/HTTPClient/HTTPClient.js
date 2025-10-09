/**
 * Поддерживаемые HTTP-методы
 * @constant {Object}
 * @property {string} GET - Метод GET
 * @property {string} POST - Метод POST
 * @property {string} PUT - Метод PUT
 * @property {string} DELETE - Метод DELETE
 */
const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
})

/**
 * HTTP-клиент для выполнения запросов к API
 * @class
 */
export class HTTPClient {
	/**
	 * Создаёт экземпляр HTTPClient.
	 * @constructor
	 * @param {Object} [config={}] - Конфигурация клиента.
	 * @param {string} [config.baseUrl] - Базовый URL для всех запросов.
	 * @param {Object.<string, string|Function>} [config.headers] - Заголовки по умолчанию (значение может быть строкой или функцией, возвращающей строку).
	 * @param {number} [config.timeout] - Таймаут запросов в миллисекундах.
	 */

	constructor({ baseUrl, headers = {}, timeout = 3000 } = {}) {
		/**
		 * Конфигурация по умолчанию.
		 * @type {{ baseUrl?: string, headers?: Object.<string, string|Function>, timeout?: number }}
		 */
		this.default = {
			baseUrl,
			headers,
			timeout,
		}
	}

	/**
	 * Фабричный метод для создания экземпляра HTTPClient
	 * @static
	 * @param {Object} [config={}] - Конфигурация клиента
	 * @returns {HTTPClient} Новый экземпляр HTTPClient
	 */
	static create(config = {}) {
		return new HTTPClient(config)
	}

	/**
	 * Выполняет GET-запрос
	 * @param {string} path - Путь запроса
	 * @param {Object} [config={}] - Дополнительные параметры (например, params, headers)
	 * @returns {Promise<{data: Object, status: number, statusText: string, headers: Object}>}
	 */
	get(path, config) {
		return this._request({ path, ...config, method: METHODS.GET })
	}

	/**
	 * Выполняет POST-запрос
	 * @param {string} path - Путь запроса
	 * @param {Object} [config={}] - Дополнительные параметры (например, data, headers)
	 * @returns {Promise<{data: Object, status: number, statusText: string, headers: Object}>}
	 */
	post(path, config) {
		return this._request({ path, ...config, method: METHODS.POST })
	}

	/**
	 * Выполняет PUT-запрос
	 * @param {string} path - Путь запроса
	 * @param {Object} [config={}] - Дополнительные параметры (например, data, headers)
	 * @returns {Promise<{data: Object, status: number, statusText: string, headers: Object}>}
	 */
	put(path, config) {
		return this._request({ path, ...config, method: METHODS.PUT })
	}

	/**
	 * Выполняет DELETE-запрос
	 * @param {string} path - Путь запроса
	 * @param {Object} [config={}] - Дополнительные параметры (например, params, headers)
	 * @returns {Promise<{data: Object, status: number, statusText: string, headers: Object}>}
	 */
	delete(path, config) {
		return this._request({ path, ...config, method: METHODS.DELETE })
	}

	/**
	 * Внутренний метод для выполнения HTTP запросов
	 * @private
	 * @param {Object} options - Параметры запроса
	 * @param {string} options.method - HTTP метод
	 * @param {string} options.path - Путь запроса
	 * @param {Object} options.params - Query параметры
	 * @param {Object} options.data - Данные для отправки
	 * @returns {Promise<Object>} Объект с результатом запроса
	 * @throws {Error} Выбрасывает ошибку при сетевых проблемах или HTTP ошибках
	 */
	async _request({ method = METHODS.GET, path, params = {}, data = {} }) {
		const requestMethod = method.toUpperCase()

		let requestUrl = new URL(this.default.baseUrl + path)

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString())
			}
		}

		requestUrl = requestUrl.toString()

		const requestHeaders = new Headers()

		for (const [headerName, header] of Object.entries(this.default.headers)) {
			if (typeof header === 'function') {
				requestHeaders.set(headerName, header())
			} else {
				requestHeaders.set(headerName, header)
			}
		}

		let requestBody = undefined

		if (data && requestMethod !== METHODS.GET) {
			if (typeof data === 'object') {
				requestHeaders.set('Content-Type', 'application/json')
				requestBody = JSON.stringify(data)
			} else {
				requestBody = data
			}
		}

		const controller = new AbortController()
		const signal = controller.signal

		const timeout = setTimeout(() => {
			controller.abort()
		}, this.default.timeout)

		try {
			const response = await fetch(requestUrl, {
				method: requestMethod,
				headers: requestHeaders,
				body: requestBody,
				credentials: 'include',
				signal,
			})

			if (!response.ok) {
				throw new Error(
					`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseData)}`,
				)
			}

			clearTimeout(timeout)

			const responseHeaders = {}
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value
			})

			let responseData
			responseData = await response.json()

			return {
				data: responseData,
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders,
			}
		} catch (error) {
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				throw new Error('Network error')
			}
			throw error
		}
	}
}
