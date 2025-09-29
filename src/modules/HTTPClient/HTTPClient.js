/**
 * HTTP-методы.
 * @readonly
 * @enum {string}
 */
const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
})

/**
 * Класс для выполнения HTTP-запросов с настройкой базового URL и методом.
 */
export class HTTPClient {
	constructor() {
		/** @type {{ baseUrl?: string }} */
		this.default = {}
	}

	/**
	 * Устанавливает базовую конфигурацию для клиента.
	 * @param {{ baseUrl: string }} defaultConfig - Конфигурация по умолчанию.
	 */
	configurate(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
	}

	/**
	 * Выполняет GET-запрос.
	 * @param {string} url - Адрес запроса.
	 * @param {Object} [config] - Дополнительная конфигурация.
	 */
	get(url, config = {}) {
		return this.request({ ...config, method: METHODS.GET, url })
	}

	/**
	 * Выполняет POST-запрос.
	 * @param {string} url - Адрес запроса.
	 * @param {*} data - Тело запроса.
	 * @param {Object} [config] - Дополнительная конфигурация.
	 */
	post(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.POST, url, data })
	}

	/**
	 * Выполняет PUT-запрос.
	 */
	put(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.PUT, url, data })
	}

	/**
	 * Выполняет PATCH-запрос.
	 */
	patch(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.PATCH, url, data })
	}

	/**
	 * Выполняет DELETE-запрос.
	 */
	delete(url, config = {}) {
		return this.request({ ...config, method: METHODS.DELETE, url })
	}

	/**
	 * Выполняет HEAD-запрос.
	 */
	head(url, config = {}) {
		return this.request({ ...config, method: METHODS.HEAD, url })
	}

	/**
	 * Выполняет OPTIONS-запрос.
	 */
	options(url, config = {}) {
		return this.request({ ...config, method: METHODS.OPTIONS, url })
	}

	/**
	 * Основной метод выполнения запроса.
	 * @param {Object} config - Конфигурация запроса.
	 * @returns {Promise<Object>} Ответ от сервера.
	 */
	async request(config) {
		const {
			url,
			method = METHODS.GET,
			headers = {},
			params = {},
			data = {},
		} = config

		const requestMethod = method.toUpperCase()
		const requestUrl = this.formReqUrl(url, params)
		// alert('requestUrl: ' + requestUrl)

		const { requestHeaders, requestBody } = this.formReqHeadersAndBody(
			headers,
			data,
			requestMethod,
		)

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
			// const contentType = response.headers.get('content-type')

			// if (contentType?.includes('application/json')) {
			// 	responseData = await response.json()
			// } else {
			// 	responseData = await response.text()
			// }
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

	/**
	 * Формирует полный URL с query-параметрами.
	 * @param {string} url - Относительный путь.
	 * @param {Object} params - Query-параметры.А
	 * @returns {string} Полный URL.
	 */
	formReqUrl(url, params) {
		const base = new URL(this.default.baseUrl)
		const path = url.startsWith('/') ? url : '/' + url
		base.pathname = base.pathname.endsWith('/')
			? base.pathname + path.slice(1)
			: base.pathname + path

		let requestUrl = base

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString())
			}
		}
		return requestUrl.toString()
	}

	/**
	 * Формирует заголовки и тело запроса.
	 * @param {Object} headers - Заголовки запроса.
	 * @param {*} data - Тело запроса.
	 * @param {string} requestMethod - HTTP-метод.
	 * @returns {{ requestHeaders: Headers, requestBody: string | undefined }}
	 */
	formReqHeadersAndBody(headers, data, requestMethod) {
		let requestHeaders = new Headers(headers)
		let requestBody = undefined
		requestHeaders.set('Authorization', localStorage.getItem('jwtToken'))
		if (
			data &&
			requestMethod !== METHODS.GET &&
			requestMethod !== METHODS.HEAD
		) {
			if (typeof data === 'object') {
				requestHeaders.set('Content-Type', 'application/json')
				requestBody = JSON.stringify(data)
			} else {
				requestBody = data
			}
		}

		return { requestHeaders, requestBody }
	}
}
