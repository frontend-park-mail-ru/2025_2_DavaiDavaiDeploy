import Component from '../../components/core/baseComponent.js'

class PasswordInput extends Component {
	#parent
	#passwordInput
	#iconElement

	constructor(parent, config = {}) {
		super(parent, { id: config.id }, 'passwordInput')
		this.#parent = parent
		this.config = config
	}

	#togglePasswordVisibility() {
		const passwordType =
			this.#passwordInput.getAttribute('type') === 'password'
				? 'text'
				: 'password'

		this.#passwordInput.setAttribute('type', passwordType)
		this.#iconElement.src =
			passwordType === 'password'
				? '/src/assets/img/eye_close.svg'
				: '/src/assets/img/eye_open.svg'
	}

	#addEventListeners() {
		this.#iconElement.addEventListener('click', () => {
			this.#togglePasswordVisibility()
		})
	}
	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML('beforeend', this.html(this.config))
		this.#passwordInput = document.querySelector('#' + this.config.id)
		this.#iconElement = document.querySelector('#' + this.config.postIconID)
		this.#addEventListeners()
	}
}

export default PasswordInput
