import Component from '../../components/core/baseComponent.js'

class Input extends Component {
	#parent

	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'input')
		this.#parent = parent
		this.config = config
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
	}
}

export default Input
