import type { Config, RequestConfig, RouterConfig } from './HTTPClientTypes'
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
} as const)

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

	default: RouterConfig

	constructor({ baseUrl, headers, timeout }: RouterConfig) {
		this.default = {
			baseUrl,
			headers,
			timeout,
		}
	}

	static create(config: RouterConfig) {
		return new HTTPClient(config)
	}

	get(path: string, config?: Config) {
		return this._request({ path, ...config, method: METHODS.GET })
	}

	post(path: string, config?: Config) {
		return this._request({ path, ...config, method: METHODS.POST })
	}

	put(path: string, config?: Config) {
		return this._request({ path, ...config, method: METHODS.PUT })
	}

	delete(path: string, config?: Config) {
		return this._request({ path, ...config, method: METHODS.DELETE })
	}

	async _request({
		method = METHODS.GET,
		path,
		params = {},
		data = {},
	}: RequestConfig) {
		const requestMethod = method.toUpperCase()

		let requestUrl = new URL(this.default.baseUrl + path)

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString())
			}
		}

		const requestHeaders = new Headers()

		for (const [headerName, header] of Object.entries(
			this.default.headers ?? {},
		)) {
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
			const response = await fetch(requestUrl.toString(), {
				method: requestMethod,
				headers: requestHeaders,
				body: requestBody,
				credentials: 'include',
				signal,
			})

			let responseData: any

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			clearTimeout(timeout)

			const responseHeaders: Record<string, string> = {}
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value
			})

			responseData = await response.json()

			return {
				data: responseData,
				status: response.status,
				statusText: response.statusText,
				headers: responseHeaders,
			}
		} catch (error: any) {
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				throw new Error('Network error')
			}
			throw error
		}
	}
}
