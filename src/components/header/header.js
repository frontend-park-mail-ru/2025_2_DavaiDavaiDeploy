import Component from '../core/baseComponent.js'

/**
 * Шапка
 */
class Header extends Component {
	#parent
	#navigate

	/**
	 * Конструктор класса
	 * @param {object} params - параметры
	 * @param {Function} params.navigate - функция навигации по страницам
	 */
	constructor({ parent, navigate }) {
		super(parent, { id: 'header' }, 'header')
		this.#navigate = navigate
		this.#parent = parent
		// Привязываем контекст для обработчиков
		this.handleLoginClick = this.handleLoginClick.bind(this)
		this.handleLinkClick = this.handleLinkClick.bind(this)
	}

	/**
	 * Обработчик клика по кнопке входа
	 */
	handleLoginClick() {
		if (this.#navigate) {
			this.#navigate('/login')
		}
	}

	/**
	 * Обработчик клика по навигационным ссылкам
	 * @param {Event} event - событие клика
	 */
	handleLinkClick(event) {
		event.preventDefault()
		const href = event.target.getAttribute('href')

		if (href && this.#navigate) {
			this.#navigate(href)
		}
	}

	/**
	 * Добавление обработчиков событий
	 */
	addEventListeners() {
		const loginButton = document.getElementById('login-button')
		const navLinks = document.querySelectorAll('.sections__link')

		if (loginButton) {
			loginButton.addEventListener('click', this.handleLoginClick)
		}

		navLinks.forEach(link => {
			link.addEventListener('click', this.handleLinkClick)
		})
	}

	/**
	 * Удаление обработчиков событий (для очистки)
	 */
	removeEventListeners() {
		const loginButton = document.getElementById('login-button')
		const navLinks = document.querySelectorAll('.sections__link')

		if (loginButton) {
			loginButton.removeEventListener('click', this.handleLoginClick)
		}

		navLinks.forEach(link => {
			link.removeEventListener('click', this.handleLinkClick)
		})
	}

	/**
	 * Обновление состояния кнопки входа/выхода
	 * @param {boolean} isLoggedIn - статус авторизации
	 * @param {string} userName - имя пользователя
	 */
	updateAuthState(isLoggedIn, userName = '') {
		const userElement = document.querySelector('.user')

		if (userElement && isLoggedIn) {
			userElement.innerHTML = `
                <span class="user__name">${userName}</span>
                <img src="/src/assets/img/avatar.jpg" alt="Аватар" class="user__avatar">
            `
		} else if (userElement) {
			userElement.innerHTML = `
                <button id='login-button' class="user__login-button">Войти</button>
            `
			// Добавляем обработчик для новой кнопки
			const loginButton = document.getElementById('login-button')
			if (loginButton) {
				loginButton.addEventListener('click', this.handleLoginClick)
			}
		}
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		// Очищаем предыдущий хедер
		const existingHeader = document.querySelector('.header')
		if (existingHeader) {
			existingHeader.remove()
		}

		// Рендерим шаблон
		this.#parent.insertAdjacentHTML('afterbegin', this.html())

		// Добавляем обработчики событий
		this.addEventListeners()
	}

	/**
	 * Уничтожение компонента (очистка)
	 */
	destroy() {
		this.removeEventListeners()
		const existingHeader = document.querySelector('.header')
		if (existingHeader) {
			existingHeader.remove()
		}
	}
}

export default Header
