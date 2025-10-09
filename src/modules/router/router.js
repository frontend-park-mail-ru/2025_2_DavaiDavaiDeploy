import Footer from '../../components/footer/footer.js'
import Header from '../../components/header/header.js'
import { normalize } from '../../helpers/normalizeHelper/normalizeHelper.js'
import actions from '../../redux/features/user/actions.js'
import { selectUser } from '../../redux/features/user/selectors.js'
import { store } from '../../redux/store.js'

/**
 * Класс Router управляет навигацией внутри SPA (Single Page Application),
 * обновляет контент без перезагрузки страницы, рендерит Header и Footer.
 */
export class Router {
	/**
	 * @type {Proxy} Прокси-объект, используемый для маршрутизации.
	 */
	routes

	/**
	 * @type {HTMLElement} Родительский контейнер, в который рендерится содержимое.
	 */
	parent

	/**
	 * @type {Object|null} Текущая активная страница.
	 */
	curPage = null

	/**
	 * @type {Header|null} Текущий компонент заголовка.
	 */
	header = null

	/**
	 * Создает экземпляр Router.
	 * Инициализирует маршруты, контейнер и слушатели событий.
	 * @param {Object.<string, { href: string, component: any, hasHeader?: boolean, hasFooter?: boolean }>} routes Объект с маршрутами приложения.
	 * @param {HTMLElement} parent Родительский контейнер для отображения контента.
	 */
	constructor(routes, parent) {
		this.routes = new Proxy(routes, this.routesHandler)
		this.parent = parent
		this.curPage = null
		this.header = null

		this.initEventListeners()
	}

	/**
	 * Фабричный метод для создания экземпляра Router.
	 * @param {Object} routes Объект маршрутов.
	 * @param {HTMLElement} parent Родительский контейнер.
	 * @returns {Router} Новый экземпляр Router.
	 */
	static create(routes, parent) {
		return new Router(routes, parent)
	}

	/**
	 * Добавляет слушателей событий для навигации:
	 * - popstate: при нажатии кнопок "Назад/Вперед"
	 * - click: для перехвата кликов по ссылкам <a>
	 * @private
	 * @returns {void}
	 */
	initEventListeners = () => {
		window.addEventListener('popstate', this.handlePopState)
		window.addEventListener('click', this.handleClick)
	}

	/**
	 * Обрабатывает переход при использовании истории браузера.
	 * @private
	 * @returns {void}
	 */
	handlePopState = () => {
		this.navigate(window.location.pathname + window.location.search, {}, false)
	}

	/**
	 * Перехватывает клики по ссылкам и выполняет SPA-навигацию.
	 * @param {MouseEvent} event Событие клика.
	 * @private
	 * @returns {void}
	 */
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

	/**
	 * Обработчик Proxy для поиска совпадений маршрутов.
	 * Определяет параметры URL по шаблонам (например, /user/:id).
	 * @private
	 */
	routesHandler = {
		/**
		 * @param {Object} target Исходный объект маршрутов.
		 * @param {string} path Путь для поиска маршрута.
		 * @returns {{route: Object, params: Object}} Найденный маршрут и параметры.
		 */
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

	/**
	 * Запускает роутер:
	 * - Проверяет авторизацию пользователя через Redux
	 * - Переходит на текущий URL
	 * @returns {void}
	 */
	start = () => {
		store.dispatch(actions.checkUserAction())
		this.navigate(window.location.pathname + window.location.search)
	}

	/**
	 * Выполняет навигацию по указанному пути.
	 * Рендерит Header, контент и Footer.
	 * @param {string} path Путь перехода (например, '/home?tab=1')
	 * @param {Object} [state={}] Состояние, передаваемое странице.
	 * @param {boolean} [addToHistory=true] Добавлять ли запись в историю браузера.
	 * @returns {void}
	 */
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

	/**
	 * Очищает текущий макет страницы — удаляет контент, Header и Footer.
	 * @private
	 * @returns {void}
	 */
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

	/**
	 * Рендерит Header на странице.
	 * Использует данные пользователя из Redux store.
	 * @private
	 * @returns {void}
	 */
	renderHeader = () => {
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
	 * Рендерит основной контент страницы.
	 * Создает контейнер `.content` и инициализирует компонент страницы.
	 * @param {Object} route Объект маршрута с компонентом.
	 * @param {string} normalizedPath Нормализованный путь.
	 * @param {Object} params Параметры пути (например, {id: '123'}).
	 * @param {Object} search Query параметры строки запроса.
	 * @param {Object} state Дополнительное состояние.
	 * @private
	 * @returns {void}
	 */
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

	/**
	 * Рендерит Footer внизу страницы.
	 * @private
	 * @returns {void}
	 */
	renderFooter = () => {
		const footer = new Footer(this.parent)
		footer.render()
	}
}
