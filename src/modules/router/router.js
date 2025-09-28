import Footer from '../../components/footer/footer.js'
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
		this.lastPage = null

		this.initEventListeners()
	}

	configurate = (routes, parent) => {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
	}

	routesHandler = {
		get: (target, path) => {
			let routeName = Object.keys(target).find(key => target[key].href === path)
			if (routeName in target) {
				return target[routeName]
			}
			return target['error404']
		},
	}

	initEventListeners = () => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	handlePopState = () => {
		const path = window.location.pathname
		this.handleRouteChange(path, false)
	}

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
	 * Очищает контент и header
	 */
	clearLayout = () => {
		const oldContent = this.parent.querySelector('.content')
		if (oldContent) {
			oldContent.remove()
		}

		// Удаляем существующий header если он есть
		const oldHeader = document.querySelector('#header')
		if (oldHeader) {
			oldHeader.remove()
		}

		// Удаляем существующий footer если он есть
		const oldFooter = document.querySelector('#footer')
		if (oldFooter) {
			oldFooter.remove()
		}
	}

	renderHeader = () => {
		const header = new Header(this.parent, {
			avatar: '/src/assets/img/1+1.webp',
			login: 'Alex',
			id: 'header',
		})
		header.render()
	}

	renderFooter = () => {
		const footer = new Footer(this.parent)
		footer.render()
	}

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

	handleRouteChange = (path, addToHistory = true, props = {}) => {
		let normalizedPath = normalize(path)
		let route = this.routes[normalizedPath]

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

	start = () => {
		this.handleRouteChange(window.location.pathname)
	}
}

export default new Router()
