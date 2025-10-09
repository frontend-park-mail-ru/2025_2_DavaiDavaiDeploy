import registrationForm from '../../components/registrationForm/registrationForm.js'
import router from '../../modules/router/index.js'
import actions from '../../redux/features/user/actions.js'
import {
	selectError,
	selectUserError,
} from '../../redux/features/user/selectors.js'
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
		if (!selectUserError(store.getState())) {
			router.navigate('/')
		} else {
			alert('Произошла ошибка регистрации: ' + selectError(store.getState()))
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
