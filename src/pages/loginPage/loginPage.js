import LoginForm from '../../components/loginForm/loginForm.js'
import { router } from '../../index.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'
import Page from '../core/basePage.js'

/**
 * Класс для отображения страницы входа.
 */
export default class LoginPage extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement, location) {
		super(rootElement, location, 'loginPage')
	}

	onSubmit = (login, password) => {
		store.dispatch(actions.loginUserAction(login, password))
	}

	handleStoreChange = () => {
		if (!store.getState().user.users.error) {
			router.navigate('/')
		} else {
			alert('Произошла ошибка ЛОГИНИЗАЦИИ: ' + store.getState().user.error)
		}
		this.unsubscribe?.()
	}

	/**
	 * Рендерит страницу входа и форму.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML(
			'afterbegin',
			this.template({
				text: 'Login',
			}),
		)

		const form = new LoginForm(
			this.self.querySelector('#login-form-container'),
			{
				onSubmit: this.onSubmit,
			},
		)
		form.render()

		this.unsubscribe = store.subscribe(this.handleStoreChange)
	}
}
