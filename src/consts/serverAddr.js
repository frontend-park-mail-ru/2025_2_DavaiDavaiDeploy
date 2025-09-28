import { isProduction } from './../env.js'

export const serverAddr = isProduction
	? 'http://ddfilms.online/api'
	: 'http://localhost:5458/api'
