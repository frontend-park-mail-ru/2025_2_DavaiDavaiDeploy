import { serverAddr } from '../consts/serverAddr.js'
import HTTPClient from '../modules/HTTPClient/index.js'

export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: {},
	timeout: 1000,
})
