import registrationForm from '../../components/registrationForm/registrationForm.js'

export default class RegistrationPage {
	#parent
	#self
	#unsubscribe

	constructor(rootElement) {
		this.#parent = rootElement
	}

	get template() {
		return Handlebars.templates[`registrationPage.hbs`]({
			text: 'Registration',
		})
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.id = 'registration-page'
		this.#self.classList.add('registration-page')
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		const form = new registrationForm(
			document.querySelector('#registration-form-container'),
		)
		form.render()
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
