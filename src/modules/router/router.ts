import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import { normalize } from '@/helpers/normalizeHelper/normalizeHelper'
import actions from '@/redux/features/user/actions'
import { selectUser } from '@/redux/features/user/selectors'
import { store } from '@/redux/store'
import type { RouteConfig, Routes } from './RouterTypes'

export class Router {
	routes: Routes
	parent: Element
	curPage: any = null
	header: any = null

	constructor(routes: Routes, parent: Element) {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
		this.curPage = null
		this.header = null

		this.initEventListeners()
	}

	static create(routes: Routes, parent: Element) {
		return new Router(routes, parent)
	}

	initEventListeners = (): void => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	handlePopState = (): void => {
		this.navigate(window.location.pathname + window.location.search, {}, false)
	}

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

	start = (): void => {
		store.dispatch(actions.checkUserAction())
		this.navigate(window.location.pathname + window.location.search)
	}

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

	renderFooter = (): void => {
		const footer = new Footer(this.parent)
		footer.render()
	}
}
