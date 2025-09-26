import Component from '../../components/core/baseComponent.js'

class Input extends Component {
	#parent
	#errorElement

	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'input')
		this.#parent = parent
		this.config = config
	}

	showError(message) {
		this.#errorElement.textContent = message
		this.#errorElement.style.display = 'block'
		this.self.classList.add('input-error')
	}

	hideError() {
		if (this.#errorElement) {
			this.#errorElement.style.display = 'none'
		}
		this.self.classList.remove('input-error')
	}

	validate(value, validator, extraValue = null) {
		if (!validator) {
			return { isValid: true, message: '' }
		}

		if (extraValue !== null) {
			return validator(value, extraValue)
		}
		return validator(value)
	}

	#validateInput() {
		const result = this.validate(this.self.value, this.config.validator)

		if (!result.isValid) {
			this.showError(result.message)
			return false
		} else {
			this.hideError()
			return true
		}
	}

	#addEventListener() {
		this.self.addEventListener('input', () => {
			this.#validateInput()
		})

		// Валидация при потере фокуса
		this.self.addEventListener('blur', () => {
			this.#validateInput()
		})
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
		this.#errorElement = document.querySelector(
			'#input-error-' + this.config.id,
		)
		this.#addEventListener()
	}
}

export default Input
