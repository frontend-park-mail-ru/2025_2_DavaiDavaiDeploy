import Component from '../core/baseComponent.js'

export default class Header extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'header', {
			authorized: true,
		})
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

	render() {
		let context = {
			authorized: this.state.authorized,
			avatar: this.props.avatar,
			login: this.props.login,
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))
	}
}
