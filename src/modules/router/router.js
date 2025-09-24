import Header from '../../components/header/header.js'
import { normalize } from '../../helpers/normalizeHelper.js'

class Router {
	constructor() {
		if (Router.instance) {
			return Router.instance
		}

		Router.instance = this
		this.routes = {}
		this.parent = null

		this.handleRouteChange = this.handleRouteChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handlePopState = this.handlePopState.bind(this)

		this.initEventListeners()
	}

	configurate(routes, parent) {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
	}

	routesHandler = {
		get: function (target, path) {
			let routeName = Object.keys(target).find(key => target[key].href === path)
			if (routeName in target) {
				return target[routeName]
			}
			return target['error404']
		},
	}

	initEventListeners() {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	handlePopState() {
		const path = window.location.pathname
		this.handleRouteChange(path, false)
	}

	handleClick(event) {
		const link = event.target.closest('a')
		if (link) {
			event.preventDefault()
			const url = new URL(link.href)
			this.handleRouteChange(url.pathname)
		}
	}

	/**
	 * Проверяет, нужно ли показывать header для текущего пути
	 * @param {string} path - текущий путь
	 * @returns {boolean}
	 */
	shouldShowHeader() {
		return true
	}

	/**
	 * Очищает контент и header
	 */
	clearLayout() {
		const oldContent = this.parent.querySelector('.content')
		if (oldContent) {
			oldContent.remove()
		}

		// Удаляем существующий header если он есть
		const oldHeader = document.querySelector('.header')
		if (oldHeader) {
			oldHeader.remove()
		}
	}

	/**
	 * Рендерит header если нужно
	 * @param {string} path - текущий путь
	 */
	renderHeader() {
		const headerInstance = new Header({
			parent: this.parent,
			navigate: this.handleRouteChange.bind(this),
		})
		headerInstance.render()
	}

	handleRouteChange(path, addToHistory = true) {
		let normalizedPath = normalize(path)
		let route = this.routes[normalizedPath]

		if (!route) {
			route = this.routes['error404']
			normalizedPath = '/error'
		}

		if (addToHistory) {
			window.history.pushState({ normalizedPath }, '', normalizedPath)
		}

		// Очищаем layout перед рендером
		this.clearLayout()

		// Рендерим header если нужно
		this.renderHeader()

		// Создаем контейнер для контента
		const contentContainer = document.createElement('div')
		contentContainer.className = 'content'
		this.parent.appendChild(contentContainer)

		// Рендерим страницу
		const page = new route.component(contentContainer)
		page.render()
	}

	start() {
		this.handleRouteChange(window.location.pathname)
	}
}

export default new Router()
