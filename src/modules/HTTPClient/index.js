import { serverAddr } from '../../consts/serverAddr.js'
import { HTTPClient } from './HTTPClient.js'

const TIMEOUT = 1000

export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: {},
	timeout: TIMEOUT,
})
