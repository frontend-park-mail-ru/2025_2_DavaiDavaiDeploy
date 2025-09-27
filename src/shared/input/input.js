import Component from '../../components/core/baseComponent.js'
import { hideError, showError, validate } from '../../helpers/validateHelper.js'

class Input extends Component {
	#parent
	#errorElement

	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'input')
		this.#parent = parent
		this.config = config
	}

	#validateInput() {
		const result = validate(this.self.value, this.config.validator)

		if (!result.isValid) {
			showError(this.#errorElement, result.message)
			this.self.attributes.ifd = 3
			return false
		} else {
			hideError(this.#errorElement)
			this.self.attributes.ifd = 5
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
