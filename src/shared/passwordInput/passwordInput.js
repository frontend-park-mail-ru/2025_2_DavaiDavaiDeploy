import Component from '../../components/core/baseComponent.js'
import { validateHideError } from '../../helpers/validateHideError/validateHideError.js'
import { validateProducer } from '../../helpers/validateProducer/validateProducer.js'
import { validateShowError } from '../../helpers/validateShowError/validateShowError.js'

/**
 * Класс поля ввода пароля с возможностью подтверждения и отображения/скрытия.
 * @extends Component
 */
class PasswordInput extends Component {
	#parent
	#passwordInput
	#iconElement
	#errorElement
	#extraValue

	/**
	 * @param {HTMLElement} parent - Родительский элемент для рендера.
	 * @param {Object} [config={}] - Конфигурация поля пароля.
	 * @param {string|null} [extraValue=null] - Дополнительное значение для проверки подтверждения пароля.
	 */
	constructor(parent, config = {}, extraValue = null) {
		super(parent, { id: config.id }, 'passwordInput')
		this.#parent = parent
		this.#extraValue = extraValue
		this.config = config
	}

	/**
	 * Получает текущее значение пароля.
	 * @returns {string} Значение поля.
	 */
	getValue() {
		return this.#passwordInput ? this.#passwordInput.value : ''
	}

	/**
	 * Проверяет валидность значения пароля.
	 * @returns {boolean} true, если значение валидно, иначе false.
	 */
	isValid() {
		return this.#validateInput()
	}

	/**
	 * Обновляет дополнительное значение для проверки подтверждения пароля.
	 * @param {string} newValue - Новое значение для сравнения.
	 */
	updateExtraValue(newValue) {
		this.#extraValue = newValue
	}

	/**
	 * Внутренняя функция для валидации пароля.
	 * @private
	 * @returns {boolean} Результат валидации.
	 */
	#validateInput() {
		let result
		if (this.config.isConfirm) {
			result = validateProducer(
				this.self.value,
				this.config.validator,
				this.#extraValue,
			)
		} else {
			result = validateProducer(this.self.value, this.config.validator)
		}

		if (!result.isValid) {
			validateShowError(this.#errorElement, result.message)
			return false
		} else {
			validateHideError(this.#errorElement)
			return true
		}
	}

	/**
	 * Переключает видимость пароля (показ/скрытие).
	 * @private
	 */
	#togglePasswordVisibility() {
		const passwordType =
			this.#passwordInput.getAttribute('type') === 'password'
				? 'text'
				: 'password'

		this.#passwordInput.setAttribute('type', passwordType)
		this.#iconElement.src =
			passwordType === 'password'
				? './../../assets/img/eye_close.svg'
				: './../../assets/img/eye_open.svg'
	}

	/**
	 * Добавление слушателей событий для иконки и поля ввода.
	 * @private
	 */
	#addEventListeners() {
		this.#iconElement.addEventListener('click', () =>
			this.#togglePasswordVisibility(),
		)
		this.self.addEventListener('input', () => this.#validateInput())
		this.self.addEventListener('blur', () => this.#validateInput())
	}

	/**
	 * Рендеринг компонента в DOM.
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
