export default {
	action: '/',
	id: 'registration-form',
	inputs: {
		login: {
			id: 'login',
			label: 'Имя пользователя',
			name: 'login',
			type: 'text',
			placeholder: 'Введите имя пользователя',
			required: true,
			preIconSrc: '/src/assets/img/user.svg',
			formGroupID: 'login-form-group',
		},
		password: {
			id: 'password',
			label: 'Пароль',
			name: 'password',
			placeholder: 'Введите пароль',
			required: true,
			formGroupID: 'password-form-group',
			postIconID: 'password-icon',
		},
		passwordConfirm: {
			id: 'confirm-password',
			label: 'Подтверждение пароля',
			name: 'confirm-password',
			placeholder: 'Введите пароль',
			required: true,
			formGroupID: 'confirm-password-form-group',
			postIconID: 'confirm-password-icon',
		},
	},
	buttons: {
		submitBtn: {
			id: 'form__line__login_button',
			text: 'Зарегистрироваться',
			type: 'submit',
			class: 'form__button',
		},
	},
}
