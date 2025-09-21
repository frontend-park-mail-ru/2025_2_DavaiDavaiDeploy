class httpClient {
	constructor(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
	}

	get(url, config = {}) {
		return this.request({ ...config, method: 'GET', url })
	}

	post(url, data, config = {}) {
		return this.request({ ...config, method: 'POST', url, data })
	}

	put(url, data, config = {}) {
		return this.request({ ...config, method: 'PUT', url, data })
	}

	patch(url, data, config = {}) {
		return this.request({ ...config, method: 'PATCH', url, data })
	}

	delete(url, config = {}) {
		return this.request({ ...config, method: 'DELETE', url })
	}

	head(url, config = {}) {
		return this.request({ ...config, method: 'HEAD', url })
	}

	options(url, config = {}) {
		return this.request({ ...config, method: 'OPTIONS', url })
	}

	async request(config) {
		const { url, method = 'GET', headers = {}, params = {}, data = {} } = config

		let requestMethod = this.formReqMethod(method)
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

	formReqMethod(method) {
		return method.toUpperCase()
	}

	formReqUrl(url, params) {
		let requestUrl = this.default.baseUrl + url

		const queryParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				queryParams.append(key, value.toString())
			}
		})

		const queryString = queryParams.toString()
		if (queryString) {
			requestUrl += (requestUrl.includes('?') ? '&' : '?') + queryString
		}

		return requestUrl
	}

	formReqHeadersAndBody(headers, data, requestMethod) {
		let requestHeaders = new Headers(headers)
		let requestBody = undefined

		if (data && requestMethod !== 'GET' && requestMethod !== 'HEAD') {
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

export default httpClient()
