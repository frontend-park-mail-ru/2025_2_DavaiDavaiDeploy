import Component from '../../components/core/baseComponent.js'
import { hideError, showError, validate } from '../../helpers/validateHelper.js'

class PasswordInput extends Component {
	#parent
	#passwordInput
	#iconElement
	#errorElement
	#extraValue

	constructor(parent, config = {}, extraValue = null) {
		super(parent, { id: config.id }, 'passwordInput')
		this.#parent = parent
		this.#extraValue = extraValue
		this.config = config
	}

	getValue() {
		return this.#passwordInput ? this.#passwordInput.value : ''
	}

	// Метод для проверки валидности
	isValid() {
		return this.#validateInput()
	}

	updateExtraValue(newValue) {
		this.#extraValue = newValue
	}

	#validateInput() {
		let result
		if (this.config.isConfirm) {
			result = validate(
				this.self.value,
				this.config.validator,
				this.#extraValue,
			)
		} else {
			result = validate(this.self.value, this.config.validator)
		}

		if (!result.isValid) {
			showError(this.#errorElement, result.message)
			return false
		} else {
			hideError(this.#errorElement)
			return true
		}
	}

	#togglePasswordVisibility() {
		const passwordType =
			this.#passwordInput.getAttribute('type') === 'password'
				? 'text'
				: 'password'

		this.#passwordInput.setAttribute('type', passwordType)
		this.#iconElement.src =
			passwordType === 'password'
				? '/src/assets/img/eye_close.svg'
				: '/src/assets/img/eye_open.svg'
	}

	#addEventListeners() {
		this.#iconElement.addEventListener('click', () => {
			this.#togglePasswordVisibility()
		})

		this.self.addEventListener('input', () => {
			this.#validateInput()
		})

		this.self.addEventListener('blur', () => {
			this.#validateInput()
		})
	}
	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
		this.#passwordInput = document.querySelector('#' + this.config.id)
		this.#iconElement = document.querySelector('#' + this.config.postIconID)
		this.#errorElement = document.querySelector(
			'#input-error-' + this.config.id,
		)
		this.#addEventListeners()
	}
}

export default PasswordInput
