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
	 * Обработчик изменения состояния
	 */
	#handleStoreChange = () => {
		/* eslint-disable no-console */
		console.log('в субскрайбе')
		console.log(store.getState().user)
		/* eslint-enable no-console */
		const userState = store.getState().user

		// Проверяем успешную регистрацию
		if (userState.error === null && userState.users) {
			router.handleRouteChange('/')
		} else if (userState.error) {
			alert('Произошла ошибка регистрации: ' + userState.error)
		}
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
