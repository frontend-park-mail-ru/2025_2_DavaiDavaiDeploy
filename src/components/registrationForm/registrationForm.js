import Button from '../button/button.js'
import Component from '../core/baseComponent.js'
import Input from '../input/input.js'
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

	#togglePasswordVisibility(passwordInputId, iconId) {
		const passwordInput = document.querySelector('#' + passwordInputId)
		const iconElement = document.querySelector('#' + iconId)

		const passwordType =
			passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'

		passwordInput.setAttribute('type', passwordType)
		iconElement.src =
			passwordType === 'password'
				? '/src/assets/img/eye_close.svg'
				: '/src/assets/img/eye_open.svg'
	}

	#addEventListeners() {
		document
			.querySelector('#' + registrationFormUsecase.inputs.password.postIconID)
			.addEventListener('click', () => {
				this.#togglePasswordVisibility(
					registrationFormUsecase.inputs.password.inputID,
					registrationFormUsecase.inputs.password.postIconID,
				)
			})

		document
			.querySelector(
				'#' + registrationFormUsecase.inputs.passwordConfirm.postIconID,
			)
			.addEventListener('click', () => {
				this.#togglePasswordVisibility(
					registrationFormUsecase.inputs.passwordConfirm.inputID,
					registrationFormUsecase.inputs.passwordConfirm.postIconID,
				)
			})
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
		this.#addEventListeners()
	}
}

export default RegistrationForm
