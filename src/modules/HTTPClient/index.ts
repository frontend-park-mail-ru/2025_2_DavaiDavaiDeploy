import { serverAddr } from '@/consts/serverAddr'
import { HTTPClient } from './HTTPClient'

const TIMEOUT = 1000

export default HTTPClient.create({
	baseUrl: serverAddr,
	headers: {},
	timeout: TIMEOUT,
})
