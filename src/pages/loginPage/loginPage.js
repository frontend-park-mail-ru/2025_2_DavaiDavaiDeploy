import LoginForm from '../../components/loginForm/loginForm.js'

export default class LoginPage {
	#parent
	#self
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
		this.#self = document.createElement('div')
		this.#self.id = 'login-page'
		this.#self.classList.add('login-page')
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		const form = new LoginForm(document.querySelector('#login-form-container'))
		form.render()
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
