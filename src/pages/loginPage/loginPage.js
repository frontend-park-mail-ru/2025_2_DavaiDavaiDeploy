import LoginForm from '../../components/loginForm/loginForm.js'
/**
 * Класс для отображения страницы входа.
 */
export default class LoginPage {
	#parent
	#unsubscribe

	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement) {
		this.#parent = rootElement
	}

	/**
	 * Шаблон страницы входа.
	 * @returns {string}
	 */
	get template() {
		return Handlebars.templates[`loginPage.hbs`]({
			text: 'Login',
		})
	}

	/**
	 * Рендерит страницу входа и форму.
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new LoginForm(document.querySelector('#login-form-container'))
		form.render()
	}

	/**
	 * Очистка/отписка от событий (если реализовано).
	 */
	destroy() {
		this.#unsubscribe?.()
	}
}
