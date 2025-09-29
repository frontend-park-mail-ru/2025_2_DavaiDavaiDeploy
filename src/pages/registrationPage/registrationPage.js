import registrationForm from '../../components/registrationForm/registrationForm.js'
/**
 * Класс для отображения страницы регистрации.
 */
export default class RegistrationPage {
	#parent
	#unsubscribe

	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement) {
		this.#parent = rootElement
	}

	/**
	 * Шаблон страницы регистрации.
	 * @returns {string}
	 */
	get template() {
		return Handlebars.templates[`registrationPage.hbs`]({
			text: 'Registration',
		})
	}

	/**
	 * Рендерит страницу регистрации и форму.
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new registrationForm(
			document.querySelector('#registration-form-container'),
		)
		form.render()
	}

	/**
	 * Очистка/отписка от событий (если реализовано).
	 */
	destroy() {
		this.#unsubscribe?.()
	}
}
