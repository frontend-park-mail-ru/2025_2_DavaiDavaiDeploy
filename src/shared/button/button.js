import Component from '../../components/core/baseComponent.js'

class Button extends Component {
	#parent

	constructor(parent, config = {}) {
		super(parent, config, 'button')
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

export default Button
