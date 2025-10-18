import '@/styles/globals.scss'
import 'reset-css/reset.css'
import router from './modules/router/index'

/**
 * Конфигурация маршрута.
 * @interface
 */
interface RouteConfig {
	/** @type {string} Путь маршрута */
	href: string
	/** @type {boolean} [hasHeader=true] Показывать ли header */
	hasHeader?: boolean
	/** @type {boolean} [hasFooter=true] Показывать ли footer */
	hasFooter?: boolean
}

/**
 * Коллекция маршрутов приложения.
 * @interface
 */
interface Routes {
	/** @type {RouteConfig} Конфигурация маршрута */
	[key: string]: RouteConfig
}

/**
 * Маршруты приложения.
 * @type {Routes}
 */
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

/**
 * Запускает роутер приложения.
 */
router.start()
