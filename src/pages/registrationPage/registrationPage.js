import registrationForm from '../../components/registrationForm/registrationForm.js'

export default class RegistrationPage {
	#parent
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
		this.#parent.insertAdjacentHTML('afterbegin', this.template)

		const form = new registrationForm(
			document.querySelector('#registration-form-container'),
		)
		form.render()
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
