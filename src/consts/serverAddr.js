import { isProduction } from './../env.js'

export const serverAddr = isProduction
	? 'https://ddfilms.online/api'
	: 'https://localhost:5458/api'

export const serverAddrForStatic = isProduction
	? 'https://ddfilms.online'
	: 'https://localhost:5458'
