import { isProduction } from './env.js'

export const serverAddr = isProduction
	? 'http://ddfilms.online:8080/api'
	: 'http://localhost:5458/api'
