import Button from '../../shared/button/button.js'
import Input from '../../shared/input/input.js'
import PasswordInput from '../../shared/passwordInput/passwordInput.js'
import Component from '../core/baseComponent.js'
import registrationFormUsecase from './registrationForm.usecase.js'

/* eslint-disable no-console */
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

	#updatePasswordConfirmValidation() {
		if (this.#passwordInput && this.#passwordConfirmInput) {
			const passwordValue = this.#passwordInput.getValue()
			this.#passwordConfirmInput.updateExtraValue(passwordValue)
			this.#passwordConfirmInput.isValid()
		}
	}

	#addFormSubmitListener() {
		this.self.addEventListener('submit', event => {
			event.preventDefault()

			const isLoginValid = this.#loginInput?.isValid() || false
			const isPasswordValid = this.#passwordInput?.isValid() || false
			const isConfirmValid = this.#passwordConfirmInput?.isValid() || false
			console.log(
				'я пошел отправлть форму и у меня данные ' +
					isLoginValid +
					' ' +
					isPasswordValid +
					' ' +
					isConfirmValid,
			)

			if (isLoginValid && isPasswordValid && isConfirmValid) {
				console.log('Форма валидна, отправляем данные')
			} else {
				console.log('Форма содержит ошибки')
			}
		})
	}

	#addEventListeners() {
		if (this.#passwordInput.self) {
			this.#passwordInput.self.addEventListener('input', () => {
				this.#updatePasswordConfirmValidation()
			})
		}

		this.#addFormSubmitListener()
	}

	/**
	 * Отображает ошибку
	 * @param {String} errorMessage - сообщение ошибки
	 */

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

		this.#passwordInput = new PasswordInput(
			this.self,
			registrationFormUsecase.inputs.password,
		)
		this.#passwordInput.render()

		this.#passwordConfirmInput = new PasswordInput(
			this.self,
			registrationFormUsecase.inputs.passwordConfirm,
			this.#passwordInput.getValue(),
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

/* eslint-enable no-console */
