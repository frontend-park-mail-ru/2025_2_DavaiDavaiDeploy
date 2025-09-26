import LoginForm from '../../components/loginForm/loginForm.js'

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

	render() {
		this.#parent.innerHTML = ''
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new LoginForm(document.querySelector('#login-form-container'))
		form.render()
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
