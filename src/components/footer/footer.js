import Component from '../core/baseComponent.js'

/**
 * Шапка
 */
class Footer extends Component {
	#parent

	/**
	 * Конструктор класса
	 * @param {object} params - параметры
	 * @param {Function} params.navigate - функция навигации по страницам
	 */
	constructor(parent) {
		super(parent, { id: 'footer' }, 'footer')
		this.#parent = parent
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html())
	}
}

export default Footer
