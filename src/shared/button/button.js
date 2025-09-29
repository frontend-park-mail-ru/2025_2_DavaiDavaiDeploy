import Component from '../../components/core/baseComponent.js'

/**
 * Класс кнопки, расширяющий базовый компонент.
 * @extends Component
 */
class Button extends Component {
	#parent

	/**
	 * @param {HTMLElement} parent - Родительский элемент, куда будет вставлен компонент.
	 * @param {Object} [options] - Настройки компонента.
	 * @param {Function} [options.onSubmit] - Коллбек, вызываемый при клике на кнопку.
	 * @param {Object} [options.config] - Остальные настройки кнопки.
	 */
	constructor(parent, { onSubmit, ...config } = {}) {
		super(parent, config, 'button')
		this.#parent = parent
		this.config = config
		this.onSubmit = onSubmit
	}

	/**
	 * Рендеринг кнопки в DOM.
	 * Добавляет обработчик события click, если указан onSubmit.
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
		if (this.onSubmit) {
			this.self.addEventListener('click', e => this.onSubmit(e))
		}
	}
}

export default Button
