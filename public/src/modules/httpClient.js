class httpClient {
	constructor(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
	}

	async request(config) {
		const baseUrl = this.default.baseUrl
		const { url, method = 'GET', headers = {}, params = {}, data } = config

		let requestMethod = method.toUpperCase()

		let fullUrl = baseUrl + url

		const queryParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				queryParams.append(key, value.toString())
			}
		})

		const queryString = queryParams.toString()
		if (queryString) {
			fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString
		}

		let requestHeaders = new Headers(headers)

		let requestBody = undefined

		if (data && requestMethod !== 'GET') {
			if (typeof data === 'object') {
				requestHeaders.set('Content-Type', 'application/json')
				requestBody = JSON.stringify(data)
			} else {
				requestBody = data
			}
		}

		try {
			const response = await fetch(fullUrl, {
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
}

export default httpClient()

// let client = new httpClient({ baseUrl: 'http://localhost:8080' })
// let res = client.request({
// 	method: 'GET',
// 	url: '/users/1',
// 	data: { text: 'hello' },
// })

// res.then(console.log(), null)
