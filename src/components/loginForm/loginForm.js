import Button from '../../shared/button/button.js'
import Input from '../../shared/input/input.js'
import PasswordInput from '../../shared/passwordInput/passwordInput.js'
import Component from '../core/baseComponent.js'
import loginFormUsecase from './loginForm.usecase.js'

class LoginForm extends Component {
	#parent
	#loginInput
	#passwordInput
	#passwordConfirmInput
	#button

	constructor(parent) {
		super(
			parent,
			{
				id: loginFormUsecase.id,
			},
			'loginForm',
		)
		this.#parent = parent
		this.#loginInput = null
		this.#passwordInput = null
		this.#passwordConfirmInput = null
		this.#button = null
	}

	remove() {
		this.#loginInput.remove()
		this.#passwordInput.remove()
		this.#passwordConfirmInput.remove()
		this.#button.remove()
	}

	/**
	 * Рендеринг компонента
	 */
	render() {
		this.#parent.insertAdjacentHTML(
			'beforeend',
			this.html({
				action: loginFormUsecase.action,
				id: loginFormUsecase.id,
			}),
		)

		this.#loginInput = new Input(this.self, loginFormUsecase.inputs.login)
		this.#loginInput.render()

		this.#passwordInput = new PasswordInput(
			this.self,
			loginFormUsecase.inputs.password,
		)
		this.#passwordInput.render()

		this.#button = new Button(
			document.querySelector('#form__footer'),
			loginFormUsecase.buttons.submitBtn,
		)
		this.#button.render()
	}
}

export default LoginForm
