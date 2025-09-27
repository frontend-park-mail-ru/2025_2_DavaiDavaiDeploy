import Component from '../../components/core/baseComponent.js'

class Button extends Component {
	#parent

	constructor(parent, { onSubmit, ...config } = {}) {
		super(parent, config, 'button')
		this.#parent = parent
		this.config = config
		this.onSubmit = onSubmit
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
		if (this.onSubmit) {
			this.self.addEventListener('click', e => this.onSubmit(e))
		}
	}
}

export default Button
