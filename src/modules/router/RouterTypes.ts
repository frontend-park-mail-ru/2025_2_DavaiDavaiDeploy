/**
 * Конфигурация маршрута.
 * @interface
 */
export interface RouteConfig {
	/** @type {string} Путь маршрута */
	href: string
	/** @type {any} Компонент для рендеринга */
	component: any
	/** @type {boolean} [hasHeader=true] Показывать ли заголовок */
	hasHeader?: boolean
	/** @type {boolean} [hasFooter=true] Показывать ли подвал */
	hasFooter?: boolean
}

/**
 * Коллекция маршрутов приложения.
 * @interface
 */
export interface Routes {
	/** @type {RouteConfig} Конфигурация маршрута */
	[key: string]: RouteConfig
}
