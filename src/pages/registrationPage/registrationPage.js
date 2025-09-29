import registrationForm from '../../components/registrationForm/registrationForm.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

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

	#onSubmit = (login, password) => {
		store.dispatch(actions.registerUserAction(login, password))
	}

	/**
	 * Рендерит страницу регистрации и форму.
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new registrationForm(
			document.querySelector('#registration-form-container'),
			{
				onSubmit: this.#onSubmit,
			},
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
