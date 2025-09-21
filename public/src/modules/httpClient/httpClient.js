export class httpClient {
	constructor(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
		this.METHODS = Object.freeze({
			GET: 'GET',
			POST: 'POST',
			PUT: 'PUT',
			PATCH: 'PATCH',
			DELETE: 'DELETE',
			HEAD: 'HEAD',
			OPTIONS: 'OPTIONS',
		})
	}

	get(url, config = {}) {
		return this.request({ ...config, method: this.METHODS.GET, url })
	}

	post(url, data, config = {}) {
		return this.request({ ...config, method: this.METHODS.POST, url, data })
	}

	put(url, data, config = {}) {
		return this.request({ ...config, method: this.METHODS.PUT, url, data })
	}

	patch(url, data, config = {}) {
		return this.request({ ...config, method: this.METHODS.PATCH, url, data })
	}

	delete(url, config = {}) {
		return this.request({ ...config, method: this.METHODS.DELETE, url })
	}

	head(url, config = {}) {
		return this.request({ ...config, method: this.METHODS.HEAD, url })
	}

	options(url, config = {}) {
		return this.request({ ...config, method: this.METHODS.OPTIONS, url })
	}

	async request(config) {
		const {
			url,
			method = this.METHODS.GET,
			headers = {},
			params = {},
			data = {},
		} = config

		let requestMethod = method.toUpperCase()
		let requestUrl = this.formReqUrl(url, params)
		let { requestHeaders, requestBody } = this.formReqHeadersAndBody(
			headers,
			data,
			requestMethod,
		)

		try {
			const response = await fetch(requestUrl, {
				method: requestMethod,
				headers: requestHeaders,
				body: requestBody,
			})

			const responseHeaders = {}
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value
			})

			const contentType = response.headers.get('content-type')

			let responseData

			if (contentType?.includes('application/json')) {
				responseData = await response.json()
			} else {
				responseData = await response.text()
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

	formReqUrl(url, params) {
		let requestUrl = new URL(url, this.default.baseUrl)

		const queryParams = new URLSearchParams()

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				queryParams.append(key, value.toString())
			}
		}

		const queryString = queryParams.toString()
		if (queryString) {
			requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
		}

		return requestUrl.toString()
	}

	formReqHeadersAndBody(headers, data, requestMethod) {
		let requestHeaders = new Headers(headers)
		let requestBody = undefined

		if (
			data &&
			requestMethod !== this.METHODS.GET &&
			requestMethod !== this.METHODS.HEAD
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
