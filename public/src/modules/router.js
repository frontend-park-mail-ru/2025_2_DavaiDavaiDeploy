import { normalize } from '../helpers/normalizeHelper.js'
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

	handlePopState(_event) {
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

	handleRouteChange(path, addToHistory = true) {
		let normalizedPath = normalize(path)
		let route = this.routes[normalizedPath]
		if (addToHistory) {
			window.history.pushState({ normalizedPath }, '', normalizedPath)
		}
		const page = new route.component(this.parent)
		page.render()
	}

	start() {
		this.handleRouteChange(window.location.pathname)
	}
}

export default new Router()
