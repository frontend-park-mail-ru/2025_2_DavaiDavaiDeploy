import '@/styles/globals.scss'
import 'reset-css/reset.css'
import router from './modules/router/index'

interface RouteConfig {
	href: string
	hasHeader?: boolean
	hasFooter?: boolean
}

interface Routes {
	[key: string]: RouteConfig
}

export const routes: Routes = {
	home: {
		href: '/',
	},
	login: {
		href: '/login',
		hasHeader: false,
		hasFooter: false,
	},
}

router.start()
