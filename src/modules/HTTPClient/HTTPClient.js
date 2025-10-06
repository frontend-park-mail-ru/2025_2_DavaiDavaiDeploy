const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
})

export class HTTPClient {
	constructor(config = {}) {
		this.default = {
			baseUrl: config.baseUrl,
			headers: config.headers,
		}
	}

	static create(config = {}) {
		return new HTTPClient(config)
	}

	get({ path, params }) {
		return this._request({ path, params, method: METHODS.GET })
	}

	post({ path, data }) {
		return this._request({ path, data, method: METHODS.POST })
	}

	put({ path, data, params }) {
		return this._request({ path, data, params, method: METHODS.PUT })
	}

	delete({ path, data, params }) {
		return this._request({ path, data, params, method: METHODS.DELETE })
	}

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
