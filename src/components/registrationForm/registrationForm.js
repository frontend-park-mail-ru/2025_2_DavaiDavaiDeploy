import Button from '../../shared/button/button.js'
import Input from '../../shared/input/input.js'
import PasswordInput from '../../shared/passwordInput/passwordInput.js'
import Component from '../core/baseComponent.js'
import registrationFormUsecase from './registrationForm.usecase.js'

class RegistrationForm extends Component {
	#parent
	#loginInput
	#passwordInput
	#passwordConfirmInput
	#button
	#onSubmit

	constructor(parent, props) {
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
		this.#onSubmit = props.onSubmit
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

	/**
	 * Валидация данных формы
	 */
	#validateData() {
		const isLoginValid = this.#loginInput.isValid()
		const isPasswordValid = this.#passwordInput.isValid()
		const isConfirmValid = this.#passwordConfirmInput.isValid()

		return isLoginValid && isPasswordValid && isConfirmValid
	}

	/**
	 * Обработчик отправки формы
	 */
	#handleSubmit = e => {
		e.preventDefault()
		e.stopPropagation()

		const isValid = this.#validateData()
		if (!isValid) {
			e.target.blur()
		}

		if (isValid) {
			this.#onSubmit(
				this.#loginInput.getValue(),
				this.#passwordInput.getValue(),
			)
		}
	}

	#addEventListeners() {
		if (this.#passwordInput.self) {
			this.#passwordInput.self.addEventListener('input', () => {
				this.#updatePasswordConfirmValidation()
			})
		}
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

		this.#button = new Button(document.querySelector('#form__footer'), {
			...registrationFormUsecase.buttons.submitBtn,
			onSubmit: this.#handleSubmit,
		})
		this.#button.render()

		this.#addEventListeners()
	}
}

export default RegistrationForm
