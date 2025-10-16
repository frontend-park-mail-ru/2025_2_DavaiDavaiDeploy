export const serverAddr = import.meta.env.VITE_IS_PRODUCTION
	? 'https://ddfilms.online/api'
	: 'http://localhost:5458/api'

export const serverAddrForStatic = import.meta.env.VITE_IS_PRODUCTION
	? 'https://ddfilms.online'
	: 'http://localhost:5458'
