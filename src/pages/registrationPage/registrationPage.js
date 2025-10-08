import registrationForm from '../../components/registrationForm/registrationForm.js'
import router from '../../modules/router/index.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

/**
 * Класс для отображения страницы регистрации.
 */
export default class RegistrationPage {
	#parent
	#unsubscribe
	#props = {
		location: {},
	}

	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement, params) {
		this.#parent = rootElement
		this.#props = { ...this.#props, location: { ...params } }
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
	 * Обработчик изменения состояния
	 */
	#handleStoreChange = () => {
		if (!store.getState().user.users.error) {
			router.navigate('/')
		} else {
			alert('Произошла ошибка регистрации: ' + store.getState().user.error)
		}
		this.#unsubscribe?.()
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

		this.#unsubscribe = store.subscribe(this.#handleStoreChange)
	}

	/**
	 * Очистка/отписка от событий (если реализовано).
	 */
	destroy() {
		this.#unsubscribe?.()
		if (this.#parent) {
			this.#parent.innerHTML = ''
		}
	}
}
