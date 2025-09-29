/**
 * Класс, представляющий страницу 404 (не найдено).
 */
export default class Error404 {
	#parent
	#self

	/**
	 * @param {HTMLElement} rootElement - Родительский элемент, в который рендерится страница.
	 */
	constructor(rootElement) {
		this.#parent = rootElement
	}

	/**
	 * HTML-шаблон страницы.
	 * @returns {string}
	 */
	get template() {
		return Handlebars.templates[`404.hbs`]()
	}

	/**
	 * Отображает страницу в DOM.
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.id = 'error404-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)
	}
}
