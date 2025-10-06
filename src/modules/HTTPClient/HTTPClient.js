const METHODS = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
})

export class HTTPClient {
	constructor(config) {
		this.default = { baseUrl: config.baseUrl }
	}

	static create(config = {}) {
		return new HTTPClient(config)
	}

	get({ path, data, params, headers }) {
		return this._request({ path, data, params, headers, method: METHODS.GET })
	}

	post({ path, data, headers }) {
		return this._request({ path, data, headers, method: METHODS.POST })
	}

	put({ path, params, data, headers }) {
		return this._request({
			path,
			params,
			data,
			headers,
			method: METHODS.PUT,
		})
	}

	delete({ path, data, params, headers }) {
		return this._request({
			path,
			data,
			headers,
			params,
			method: METHODS.DELETE,
		})
	}

	async _request({
		method = METHODS.GET,
		path,
		params = {},
		data = {},
		headers = {},
	}) {
		const requestMethod = method.toUpperCase()

		let requestUrl = new URL(this.default.baseUrl)
		const p = path.startsWith('/') ? path : '/' + path
		requestUrl.pathname = requestUrl.pathname.endsWith('/')
			? requestUrl.pathname + p.slice(1)
			: requestUrl.pathname + p

		for (const [key, value] of Object.entries(params)) {
			if (value != null) {
				requestUrl.searchParams.append(key, value.toString())
			}
		}

		requestUrl = requestUrl.toString()

		let requestHeaders = new Headers(headers)
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
