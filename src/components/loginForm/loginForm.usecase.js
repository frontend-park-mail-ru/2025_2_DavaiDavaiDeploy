import { validateLogin } from '../../helpers/validateLogin/validateLogin.js'
import { validatePassword } from '../../helpers/validatePassword/validatePassword.js'

export default {
	action: '/',
	id: 'login-form',
	inputs: {
		login: {
			id: 'login',
			label: 'Имя пользователя',
			name: 'login',
			type: 'text',
			placeholder: 'Введите имя пользователя',
			required: true,
			validator: validateLogin,
			preIconSrc: '../../assets/img/user.svg',
			formGroupID: 'login-form-group',
		},
		password: {
			id: 'password',
			label: 'Пароль',
			name: 'password',
			placeholder: 'Введите пароль',
			required: true,
			validator: validatePassword,
			formGroupID: 'password-form-group',
			postIconID: 'password-icon',
		},
	},
	buttons: {
		submitBtn: {
			id: 'form__line__login_button',
			text: 'Войти',
			type: 'submit',
			class: 'form__button',
		},
	},
}
