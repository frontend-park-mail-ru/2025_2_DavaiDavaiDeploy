import registrationForm from '../../components/registrationForm/registrationForm.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'

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

	#onSubmit = (login, password) => {
		store.dispatch(actions.registerUserAction(login, password))
	}

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

	destroy() {
		this.#unsubscribe?.()
	}
}
