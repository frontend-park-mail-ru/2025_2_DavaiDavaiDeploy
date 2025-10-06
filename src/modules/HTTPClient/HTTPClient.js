/**
 * HTTP методы, поддерживаемые клиентом
 * @constant {Object}
 * @property {string} GET - GET метод
 * @property {string} POST - POST метод
 * @property {string} PUT - PUT метод
 * @property {string} DELETE - DELETE метод
 */
const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
})

/**
 * HTTP клиент для выполнения запросов к API
 * @class
 */
export class HTTPClient {
	/**
	 * Создает экземпляр HTTPClient
	 * @constructor
	 * @param {Object} config - Конфигурация клиента
	 * @param {string} config.baseUrl - Базовый URL для всех запросов
	 * @param {Object} config.headers - Заголовки по умолчанию
	 */
	constructor(config = {}) {
		/**
		 * Конфигурация по умолчанию
		 * @type {Object}
		 * @property {string} baseUrl - Базовый URL
		 * @property {Object} headers - Заголовки по умолчанию
		 */
		this.default = {
			baseUrl: config.baseUrl,
			headers: config.headers,
		}
	}

	/**
	 * Фабричный метод для создания экземпляра HTTPClient
	 * @static
	 * @param {Object} config - Конфигурация клиента
	 * @returns {HTTPClient} Новый экземпляр HTTPClient
	 */
	static create(config = {}) {
		return new HTTPClient(config)
	}

	/**
	 * Выполняет GET запрос
	 * @param {Object} options - Параметры запроса
	 * @param {string} options.path - Путь запроса
	 * @param {Object} options.params - Query параметры
	 * @returns {Promise<Object>} Результат запроса
	 */
	get({ path, params }) {
		return this._request({ path, params, method: METHODS.GET })
	}

	/**
	 * Выполняет POST запрос
	 * @param {Object} options - Параметры запроса
	 * @param {string} options.path - Путь запроса
	 * @param {Object} options.data - Данные для отправки
	 * @returns {Promise<Object>} Результат запроса
	 */
	post({ path, data }) {
		return this._request({ path, data, method: METHODS.POST })
	}

	/**
	 * Выполняет PUT запрос
	 * @param {Object} options - Параметры запроса
	 * @param {string} options.path - Путь запроса
	 * @param {Object} options.data - Данные для отправки
	 * @param {Object} options.params - Query параметры
	 * @returns {Promise<Object>} Результат запроса
	 */
	put({ path, data, params }) {
		return this._request({ path, data, params, method: METHODS.PUT })
	}

	/**
	 * Выполняет DELETE запрос
	 * @param {Object} options - Параметры запроса
	 * @param {string} options.path - Путь запроса
	 * @param {Object} options.data - Данные для отправки
	 * @param {Object} options.params - Query параметры
	 * @returns {Promise<Object>} Результат запроса
	 */
	delete({ path, data, params }) {
		return this._request({ path, data, params, method: METHODS.DELETE })
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
			requestHeaders.set(headerName, header())
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

		try {
			const response = await fetch(requestUrl, {
				method: requestMethod,
				headers: requestHeaders,
				body: requestBody,
				credentials: 'include',
			})

			const responseHeaders = {}
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value
			})

			let responseData
			responseData = await response.json()

			if (!response.ok) {
				throw new Error(
					`HTTP error! status: ${response.status}, message: ${JSON.stringify(responseData)}`,
				)
			}

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
