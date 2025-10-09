import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import { normalize } from '../../helpers/normalizeHelper/normalizeHelper.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

class Router {
	constructor() {
		this.routes = {}

		this.parent = null
		this.curPage = null
		this.header = null

		this.initEventListeners()
	}

	initEventListeners = () => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	handlePopState = () => {
		this.navigate(window.location.pathname + window.location.search, {}, false)
	}

	handleClick = event => {
		const link = event.target.closest('a')
		if (link) {
			event.preventDefault()
			const url = new URL(link.href)
			if (url.pathname === window.location.pathname) {
				return
			}
			this.navigate(url.pathname + url.search)
		}
	}

	configurate = (routes, parent) => {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
	}

	routesHandler = {
		get: (target, path) => {
			for (const route of Object.values(target)) {
				const href = route.href

				const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&')

				const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)')
				const regex = new RegExp(`^${pattern}$`)
				const match = path.match(regex)

				if (match) {
					const params = {}
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

	start = () => {
		store.dispatch(actions.checkUserAction())
		this.navigate(window.location.pathname + window.location.search)
	}

	navigate = (path, state = {}, addToHistory = true) => {
		const normalizedPath = normalize(path)
		const [pathname, queryString] = normalizedPath.split('?')

		const { route, params } = this.routes[pathname]

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

	clearLayout = () => {
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

	renderContent = (route, normalizedPath, params, search, state) => {
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

	renderFooter = () => {
		const footer = new Footer(this.parent)
		footer.render()
	}
}

export default new Router()
