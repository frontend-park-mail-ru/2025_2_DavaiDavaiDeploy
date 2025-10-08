import LoginForm from '../../components/loginForm/loginForm.js'
import router from '../../modules/router/index.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

/**
 * Класс для отображения страницы входа.
 */
export default class LoginPage {
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
	 * Шаблон страницы входа.
	 * @returns {string}
	 */
	get template() {
		return Handlebars.templates[`loginPage.hbs`]({
			text: 'Login',
		})
	}

	#onSubmit = (login, password) => {
		store.dispatch(actions.loginUserAction(login, password))
	}

	#handleStoreChange = () => {
		if (!store.getState().user.users.error) {
			router.navigate('/')
		} else {
			alert('Произошла ошибка ЛОГИНИЗАЦИИ: ' + store.getState().user.error)
		}
		this.#unsubscribe?.()
	}

	/**
	 * Рендерит страницу входа и форму.
	 */

	render() {
		this.#parent.innerHTML = ''
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new LoginForm(
			document.querySelector('#login-form-container'),
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
