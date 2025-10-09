import registrationForm from '../../components/registrationForm/registrationForm.js'
import { router } from '../../index.js'
import actions from '../../redux/features/user/actions.js'
import { store } from '../../redux/store.js'
import Page from '../core/basePage.js'

/**
 * Класс для отображения страницы регистрации.
 */
export default class RegistrationPage extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement, location) {
		super(rootElement, location, 'registrationPage')
	}

	onSubmit = (login, password) => {
		store.dispatch(actions.registerUserAction(login, password))
	}

	/**
	 * Обработчик изменения состояния
	 */
	handleStoreChange = () => {
		if (!store.getState().user.users.error) {
			router.navigate('/')
		} else {
			alert('Произошла ошибка регистрации: ' + store.getState().user.error)
		}
		this.unsubscribe?.()
	}

	/**
	 * Рендерит страницу регистрации и форму.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML(
			'afterbegin',
			this.template({
				text: 'Registration',
			}),
		)

		const form = new registrationForm(
			this.self.querySelector('#registration-form-container'),
			{
				onSubmit: this.onSubmit,
			},
		)
		form.render()

		this.unsubscribe = store.subscribe(this.handleStoreChange)
	}
}
