import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { normalize } from '@/helpers/normalizeHelper/normalizeHelper'
import actions from '@/redux/features/user/actions'
import { selectUser } from '@/redux/features/user/selectors'
import { store } from '@/redux/store'
import type { RouteConfig, Routes } from './types/routes'

/**
 * Класс для управления маршрутизацией в SPA приложении.
 * Обрабатывает навигацию, рендеринг компонентов и управление состоянием.
 * @class
 */
export class Router {
	/** @type {Routes} Маршруты приложения */
	routes: Routes
	/** @type {Element} Родительский элемент для рендеринга */
	parent: Element
	/** @type {any} Текущая страница */
	curPage: any = null
	/** @type {any} Заголовок страницы */
	header: any = null

	/**
	 * Создаёт экземпляр Router.
	 * @constructor
	 * @param {Routes} routes - Конфигурация маршрутов.
	 * @param {Element} parent - Родительский элемент для рендеринга.
	 */
	constructor(routes: Routes, parent: Element) {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
		this.curPage = null
		this.header = null

		this.initEventListeners()
	}

	/**
	 * Создаёт новый экземпляр Router.
	 * @static
	 * @param {Routes} routes - Конфигурация маршрутов.
	 * @param {Element} parent - Родительский элемент для рендеринга.
	 * @returns {Router} Новый экземпляр Router.
	 */
	static create(routes: Routes, parent: Element) {
		return new Router(routes, parent)
	}

	/**
	 * Инициализирует обработчики событий для навигации.
	 * @returns {void}
	 */
	initEventListeners = (): void => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	/**
	 * Обрабатывает событие изменения истории браузера.
	 * @returns {void}
	 */
	handlePopState = (): void => {
		this.navigate(window.location.pathname + window.location.search, {}, false)
	}

	/**
	 * Обрабатывает клики по ссылкам для навигации.
	 * @param {MouseEvent} event - Событие клика мыши.
	 * @returns {void}
	 */
	handleClick = (event: MouseEvent) => {
		const link = (event.target as Element).closest('a')
		if (link) {
			event.preventDefault()
			const url = new URL(link.href)
			if (url.pathname === window.location.pathname) {
				return
			}
			this.navigate(url.pathname + url.search)
		}
	}

	/**
	 * Proxy-обработчик для маршрутов.
	 * @type {Object}
	 */
	routesHandler = {
		get: (target: Routes, path: string) => {
			for (const route of Object.values(target)) {
				const href = route.href
				const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
				const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)')
				const regex = new RegExp(`^${pattern}$`)
				const match = path.match(regex)

				if (match) {
					const params: Record<string, string> = {}
					const paramNames = [...href.matchAll(/:(\w+)/g)].map(m => m[1])
					paramNames.forEach((name, i) => {
						params[name] = match[i + 1]
					})
					return { route, params }
				}
			}
			return { route: target['error404'], params: {} }
		},
	}

	/**
	 * Запускает роутер и инициализирует приложение.
	 * @returns {void}
	 */
	start = (): void => {
		store.dispatch(actions.checkUserAction())
		this.navigate(window.location.pathname + window.location.search)
	}

	/**
	 * Выполняет навигацию к указанному пути.
	 * @param {string} path - Путь для навигации.
	 * @param {Record<string, any>} [state={}] - Состояние для передачи в маршрут.
	 * @param {boolean} [addToHistory=true] - Добавлять ли в историю браузера.
	 * @returns {void}
	 */
	navigate = (
		path: string,
		state: Record<string, any> = {},
		addToHistory: boolean = true,
	) => {
		const normalizedPath = normalize(path)
		const [pathname, queryString] = normalizedPath.split('?')

		const { route, params } = (this.routes as any)[pathname]
		const searchParams = new URLSearchParams(queryString)
		const search = Object.fromEntries(searchParams.entries())

		if (addToHistory) {
			window.history.pushState({ normalizedPath, state }, '', normalizedPath)
		}

		this.clearLayout()

		if (route?.hasHeader !== false) {
			this.renderHeader()
		}

		this.renderContent(route, normalizedPath, params, search, state)

		if (route?.hasFooter !== false) {
			this.renderFooter()
		}
	}

	/**
	 * Очищает текущий макет страницы.
	 * @returns {void}
	 */
	clearLayout = (): void => {
		this.header?.destroy()
		this.curPage?.destroy()

		const oldContent = this.parent.querySelector('.content')
		if (oldContent) {
			oldContent.remove()
		}

		const oldFooter = document.querySelector('#footer')
		if (oldFooter) {
			oldFooter.remove()
		}
	}

	/**
	 * Рендерит header страницы.
	 * @returns {void}
	 */
	renderHeader = (): void => {
		const userState = selectUser(store.getState())
		this.header = new Header(this.parent, {
			avatar: './../../assets/img/1+1.webp',
			login: userState.login,
			id: userState.id,
		})
		if (userState.login) {
			this.header.handleLogIn(userState)
		}
		this.header.render()
	}

	/**
	 * Рендерит содержимое страницы.
	 * @param {RouteConfig} route - Конфигурация маршрута.
	 * @param {string} normalizedPath - Нормализованный путь.
	 * @param {Record<string, string>} params - Параметры маршрута.
	 * @param {Record<string, string>} search - Параметры поиска.
	 * @param {Record<string, any>} state - Состояние маршрута.
	 * @returns {void}
	 */
	renderContent = (
		route: RouteConfig,
		normalizedPath: string,
		params: Record<string, string>,
		search: Record<string, string>,
		state: Record<string, any>,
	): void => {
		const contentContainer = document.createElement('div')
		contentContainer.className = 'content'
		this.parent.appendChild(contentContainer)

		const location = {
			pathname: normalizedPath,
			params,
			search,
			state,
		}

		let page = new route.component(contentContainer, location)
		page.render()
		this.curPage = page
	}

	/**
	 * Рендерит footer страницы.
	 * @returns {void}
	 */
	renderFooter = (): void => {
		const footer = new Footer(this.parent)
		footer.render()
	}
}
