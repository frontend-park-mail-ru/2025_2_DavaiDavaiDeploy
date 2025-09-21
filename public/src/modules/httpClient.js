class httpClient {
	constructor(defaultConfig) {
		this.default = { baseUrl: defaultConfig.baseUrl }
	}

	async request(config) {
		const baseUrl = this.default.baseUrl
		const { url, method = 'GET', headers = {}, data } = config
		const fullUrl = baseUrl + url

		let requestMethod = method.toUpperCase()
		let requestHeaders = headers
		let requestBody = data

		if (method === 'GET') {
			requestBody = undefined
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

// console.log(res)
