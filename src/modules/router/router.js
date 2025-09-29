import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import { normalize } from '../../helpers/normalizeHelper.js'
import { store } from '../../redux/store.js'

/**
 * Класс для клиентской маршрутизации.
 * Отвечает за отрисовку страниц, header и footer на основе URL.
 */
class Router {
	constructor() {
		/** @type {Router} */
		if (Router.instance) {
			return Router.instance
		}

		/** @type {Object.<string, Object>} */
		this.routes = {}

		/** @type {HTMLElement | null} */
		this.parent = null
		this.lastPage = null

		Router.instance = this
		this.initEventListeners()
	}

	/**
	 * Конфигурирует маршруты и контейнер, в котором будет происходить рендеринг.
	 *
	 * @param {Object.<string, { href: string, component: any, hasHeader?: boolean, hasFooter?: boolean }>} routes
	 * @param {HTMLElement} parent - Родительский DOM-элемент для отрисовки.
	 */
	configurate = (routes, parent) => {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
	}

	/**
	 * Обработчик прокси-доступа к маршрутам.
	 * Позволяет находить маршрут по `href`.
	 *
	 * @private
	 */
	routesHandler = {
		get: (target, path) => {
			let routeName = Object.keys(target).find(key => target[key].href === path)
			if (routeName in target) {
				return target[routeName]
			}
			return target['error404']
		},
	}

	/**
	 * Инициализирует слушателей событий `popstate` и `click`.
	 */
	initEventListeners = () => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	/**
	 * Обработчик изменения истории браузера.
	 */
	handlePopState = () => {
		const path = window.location.pathname
		this.handleRouteChange(path, false)
	}

	/**
	 * Обрабатывает клики по ссылкам.
	 *
	 * @param {MouseEvent} event - Событие клика.
	 */
	handleClick = event => {
		const link = event.target.closest('a')
		if (link) {
			event.preventDefault()
			const url = new URL(link.href)
			if (url.pathname === window.location.pathname) {
				return
			}
			this.handleRouteChange(url.pathname)
		}
	}

	/**
	 * Удаляет старые элементы header, footer и .content из DOM.
	 */
	clearLayout = () => {
		const oldContent = this.parent.querySelector('.content')
		if (oldContent) {
			oldContent.remove()
		}

		const oldHeader = document.querySelector('#header')
		if (oldHeader) {
			oldHeader.remove()
		}

		const oldFooter = document.querySelector('#footer')
		if (oldFooter) {
			oldFooter.remove()
		}
	}

	/**
	 * Рендерит header.
	 */
	renderHeader = () => {
		/* eslint-disable no-console */
		console.log('в зедере у нас')
		console.log(store.getState().user)
		/* eslint-enable no-console */
		const header = new Header(this.parent, {
			avatar: './../../assets/img/1+1.webp',
			login: store.getState().user.users.login,
			id: store.getState().user.users.id,
		})
		header.render()
	}

	/**
	 * Рендерит footer.
	 */
	renderFooter = () => {
		const footer = new Footer(this.parent)
		footer.render()
	}

	/**
	 * Рендерит компонент контента маршрута.
	 *
	 * @param {Object} route - Объект маршрута, содержащий компонент.
	 * @param {Object} props - Параметры для страницы.
	 */
	renderContent = (route, props) => {
		const contentContainer = document.createElement('div')
		contentContainer.className = 'content'
		this.parent.appendChild(contentContainer)

		this.lastPage?.destroy()

		let page = new route.component(contentContainer)
		if (route.needProps) {
			page = new route.component(contentContainer, props)
		}

		// Рендерим страницу
		page.render()
		this.lastPage = page
	}

	/**
	 * Выполняет переход на указанный маршрут.
	 *
	 * @param {string} path - Путь маршрута.
	 * @param {boolean} [addToHistory=true] - Добавлять ли путь в историю браузера.
	 * @param {object} [props = {}] - Параметры для страницы.
	 */
	handleRouteChange = (path, addToHistory = true, props = {}) => {
		let normalizedPath = normalize(path)
		let route = this.routes[normalizedPath]

		if (route.needProps && props.id === undefined) {
			route = this.routes['/']
			normalizedPath = '/'
		}

		if (!route) {
			route = this.routes['error404']
			normalizedPath = '/error'
		}

		if (addToHistory) {
			window.history.pushState({ normalizedPath }, '', normalizedPath)
		}

		this.clearLayout()

		if (route.hasHeader !== false) {
			this.renderHeader()
		}
		this.renderContent(route, props)
		if (route.hasFooter !== false) {
			this.renderFooter()
		}
	}

	/**
	 * Запускает роутер, обрабатывая текущий путь.
	 */
	start = () => {
		this.handleRouteChange(window.location.pathname)
	}
}

export default new Router()
