import LoginForm from '../../components/loginForm/loginForm.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

export default class LoginPage {
	#parent
	#unsubscribe

	constructor(rootElement) {
		this.#parent = rootElement
	}

	get template() {
		return Handlebars.templates[`loginPage.hbs`]({
			text: 'Login',
		})
	}

	#onSubmit = (login, password) => {
		store.dispatch(actions.loginUserAction(login, password))
	}

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
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
