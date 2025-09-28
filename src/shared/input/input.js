import Component from '../../components/core/baseComponent.js'
import { validateHideError } from '../../helpers/validateHideError/validateHideError.js'
import { validateProducer } from '../../helpers/validateProducer/validateProducer.js'
import { validateShowError } from '../../helpers/validateShowError/validateShowError.js'

class Input extends Component {
	#parent
	#errorElement

	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'input')
		this.#parent = parent
		this.config = config
	}

	#validateInput() {
		const result = validateProducer(this.self.value, this.config.validator)

		if (!result.isValid) {
			validateShowError(this.#errorElement, result.message)
			return false
		} else {
			validateHideError(this.#errorElement)
			return true
		}
	}

	getValue() {
		return this.self.value ? this.self.value : ''
	}

	isValid() {
		return this.#validateInput()
	}

	#addEventListener() {
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
		this.#errorElement = document.querySelector(
			'#input-error-' + this.config.id,
		)
		this.#addEventListener()
	}
}

export default Input
