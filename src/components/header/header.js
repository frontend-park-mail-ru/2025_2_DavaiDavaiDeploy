import router from '../../modules/router/index.js'
import { selectUser } from '../../redux/features/user/selectors.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'

export default class Header extends Component {
	#unsubscribe

	constructor(parent, props = {}) {
		super(parent, props, 'header', {
			authorized: false,
		})
		this.#unsubscribe = null
	}

	handleLogIn(props) {
		this.state.authorized = true
		this.props = {
			...this.props,
			...props,
		}
	}

	handleLogOut() {
		this.state.authorized = false
	}

	rerender() {
		const userState = selectUser(store.getState())
		if (userState.login) {
			this.handleLogIn(userState)
		} else {
			this.handleLogOut()
		}

		const header = document.querySelector('#header')
		header?.remove()

		let context = {
			authorized: this.state.authorized,
			avatar: this.props.avatar,
			login: this.props.login,
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))

		const loginButton = document.querySelector('#login-button')
		if (loginButton) {
			loginButton.addEventListener('click', () => {
				router.navigate('/login')
			})
		}
		const logo_a = document.querySelector('#logo__a')
		logo_a?.addEventListener('click', e => {
			router.handleClick(e)
		})
	}

	render() {
		const header = document.querySelector('#header')
		header?.remove()

		let context = {
			authorized: this.state.authorized,
			avatar: this.props.avatar,
			login: this.props.login,
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))

		const loginButton = document.querySelector('#login-button')
		if (loginButton) {
			loginButton.addEventListener('click', () => {
				router.navigate('/login')
			})
		}
		const logo_a = document.querySelector('#logo__a')
		logo_a?.addEventListener('click', e => {
			router.handleClick(e)
		})

		this.#unsubscribe = store.subscribe(() => {
			this.rerender()
		})
	}

	destroy() {
		this.#unsubscribe?.()

		const header = document.querySelector('#header')
		if (header) {
			header.remove()
		}
	}
}
