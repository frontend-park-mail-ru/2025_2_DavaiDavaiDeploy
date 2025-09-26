export default class RegistrationPage {
	#parent
	#self

	constructor(rootElement) {
		this.#parent = rootElement
	}

	get template() {
		return Handlebars.templates[`registrationPage.hbs`]({
			text: 'Registration',
		})
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.id = 'registration-page'
		this.#self.classList.add('registration-page')
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		document.querySelector('#password-icon').addEventListener('click', () => {
			const passwordInput = document.querySelector('#password')
			const passwordType =
				passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
			passwordInput.setAttribute('type', passwordType)
			document.querySelector('#password-icon').src =
				passwordType === 'password'
					? '/src/assets/img/eye_close.svg'
					: '/src/assets/img/eye_open.svg'
		})

		document
			.querySelector('#confirm-password-icon')
			.addEventListener('click', () => {
				const passwordInput = document.querySelector('#confirm-password')
				const passwordType =
					passwordInput.getAttribute('type') === 'password'
						? 'text'
						: 'password'
				passwordInput.setAttribute('type', passwordType)
				document.querySelector('#confirm-password-icon').src =
					passwordType === 'password'
						? '/src/assets/img/eye_close.svg'
						: '/src/assets/img/eye_open.svg'
			})
	}
}
