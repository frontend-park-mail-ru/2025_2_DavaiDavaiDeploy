import Component from '../core/baseComponent.js'

/**
 * Макет
 */
class Layout extends Component {
	#parent

	/**
	 * Конструктор класса
	 * @param {Element} parent - родительский элемент
	 */
	constructor(parent) {
		super(parent, { id: 'layout' }, 'layout')
		this.#parent = parent
	}

	/**
	 * Рендеринг страницы
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html())
	}
}

export default Layout
