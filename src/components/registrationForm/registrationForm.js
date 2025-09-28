import Button from '../../shared/button/button.js'
import Input from '../../shared/input/input.js'
import Component from '../core/baseComponent.js'
import registrationFormUsecase from './registrationForm.usecase.js'

class RegistrationForm extends Component {
	#parent
	#loginInput
	#passwordInput
	#passwordConfirmInput
	#button

	constructor(parent) {
		super(
			parent,
			{
				id: registrationFormUsecase.id,
			},
			'registrationForm',
		)
		this.#parent = parent
		this.#loginInput = null
		this.#passwordInput = null
		this.#passwordConfirmInput = null
		this.#button = null
	}

	remove() {
		this.#loginInput.remove()
		this.#passwordInput.remove()
		this.#passwordConfirmInput.remove()
		this.#button.remove()
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML(
			'beforeend',
			this.html({
				action: registrationFormUsecase.action,
				id: registrationFormUsecase.id,
			}),
		)

		this.#loginInput = new Input(
			this.self,
			registrationFormUsecase.inputs.login,
		)
		this.#loginInput.render()

		this.#passwordInput = new Input(
			this.self,
			registrationFormUsecase.inputs.password,
		)
		this.#passwordInput.render()

		this.#passwordConfirmInput = new Input(
			this.self,
			registrationFormUsecase.inputs.passwordConfirm,
		)
		this.#passwordConfirmInput.render()

		this.#button = new Button(
			document.querySelector('#form__footer'),
			registrationFormUsecase.buttons.submitBtn,
		)
		this.#button.render()
	}
}

export default RegistrationForm
