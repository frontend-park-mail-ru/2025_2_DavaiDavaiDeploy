const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
})

export class HTTPClient {
	constructor() {
		this.default = {}
	}

	configurate(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
	}

	get(url, config = {}) {
		return this.request({ ...config, method: METHODS.GET, url })
	}

	post(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.POST, url, data })
	}

	put(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.PUT, url, data })
	}

	patch(url, data, config = {}) {
		return this.request({ ...config, method: METHODS.PATCH, url, data })
	}

	delete(url, config = {}) {
		return this.request({ ...config, method: METHODS.DELETE, url })
	}

	head(url, config = {}) {
		return this.request({ ...config, method: METHODS.HEAD, url })
	}

	options(url, config = {}) {
		return this.request({ ...config, method: METHODS.OPTIONS, url })
	}

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
			})

			const responseHeaders = {}
			response.headers.forEach((value, key) => {
				responseHeaders[key] = value
			})

			let responseData
			const contentType = response.headers.get('content-type')

			if (contentType?.includes('application/json')) {
				responseData = await response.json()
			} else {
				responseData = await response.text()
			}

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

	formReqUrl(url, params) {
		let requestUrl = new URL(url, this.default.baseUrl)

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString())
			}
		}

		return requestUrl.toString()
	}

	formReqHeadersAndBody(headers, data, requestMethod) {
		let requestHeaders = new Headers(headers)
		let requestBody = undefined

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
