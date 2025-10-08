import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import { normalize } from '../../helpers/normalizeHelper/normalizeHelper.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

class Router {
	constructor() {
		this.routes = {}

		this.parent = null
		this.lastPage = null
		this.header = null

		this.initEventListeners()
	}

	configurate = (routes, parent) => {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
	}

	routesHandler = {
		get: (target, path) => {
			for (const [key, route] of Object.entries(target)) {
				const href = route.href
				const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&')

				const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)')
				const regex = new RegExp(`^${pattern}$`)
				const match = path.match(regex)

				if (match) {
					const params = {}
					const paramNames = href.match(/:(\w+)/g)

					if (paramNames) {
						paramNames.forEach((paramName, index) => {
							const cleanParamName = paramName.slice(1)
							params[cleanParamName] = match[index + 1]
						})
					}

					return { route: target[key], params }
				}
			}
			return { route: target['error404'] || null, params: {} }
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

	clearLayout = () => {
		const oldContent = this.parent.querySelector('.content')
		if (oldContent) {
			oldContent.remove()
		}

		this.header?.destroy()

		const oldFooter = document.querySelector('#footer')
		if (oldFooter) {
			oldFooter.remove()
		}
	}

	renderHeader = () => {
		const userState = store.getState().user.users
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

	renderFooter = () => {
		const footer = new Footer(this.parent)
		footer.render()
	}

	renderContent = (route, params) => {
		const contentContainer = document.createElement('div')
		contentContainer.className = 'content'
		this.parent.appendChild(contentContainer)

		this.lastPage?.destroy()

		let page = new route.component(contentContainer)
		if (route.needProps) {
			page = new route.component(contentContainer, params)
		}

		page.render()
		this.lastPage = page
	}

	handleRouteChange = (path, addToHistory = true) => {
		let normalizedPath = normalize(path)
		let { route, params } = this.routes[normalizedPath]

		if (addToHistory) {
			window.history.pushState({ normalizedPath }, '', normalizedPath)
		}

		this.clearLayout()

		if (route.hasHeader !== false) {
			this.renderHeader()
		}

		this.renderContent(route, params)

		if (route.hasFooter !== false) {
			this.renderFooter()
		}
	}

	start = () => {
		store.dispatch(actions.checkUserAction())
		this.handleRouteChange(window.location.pathname)
	}
}

export default new Router()
