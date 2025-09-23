export default class Home {
	#parent
	#self

	constructor(rootElement) {
		this.#parent = rootElement
	}

	get template() {
		return Handlebars.templates[`homePage.hbs`]({ text: 'Home' })
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.class = 'home-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)
	}
}
