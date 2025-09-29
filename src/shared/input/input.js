import Component from '../../components/core/baseComponent.js'
import { validateHideError } from '../../helpers/validateHideError/validateHideError.js'
import { validateProducer } from '../../helpers/validateProducer/validateProducer.js'
import { validateShowError } from '../../helpers/validateShowError/validateShowError.js'

/**
 * Класс текстового поля ввода, расширяющий базовый компонент.
 * @extends Component
 */
class Input extends Component {
	#parent
	#errorElement

	/**
	 * @param {HTMLElement} parent - Родительский элемент для рендера.
	 * @param {Object} [config={}] - Конфигурация поля ввода.
	 */
	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'input')
		this.#parent = parent
		this.config = config
	}

	/**
	 * Проверяет валидность значения поля ввода.
	 * @private
	 * @returns {boolean} true, если значение валидно, иначе false.
	 */
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

	/**
	 * Получает текущее значение поля ввода.
	 * @returns {string} Значение поля ввода.
	 */
	getValue() {
		return this.self.value ? this.self.value : ''
	}

	/**
	 * Проверка валидности поля ввода.
	 * @returns {boolean} true, если поле валидно, иначе false.
	 */
	isValid() {
		return this.#validateInput()
	}

	/**
	 * Добавление слушателей событий для input и blur.
	 * @private
	 */
	#addEventListener() {
		this.self.addEventListener('input', () => this.#validateInput())
		this.self.addEventListener('blur', () => this.#validateInput())
	}

	/**
	 * Рендеринг компонента в DOM.
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
