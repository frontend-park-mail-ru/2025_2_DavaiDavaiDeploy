/**
 * Класс, представляющий страницу 404 (не найдено).
 */
export default class Error404 {
	/** @type {HTMLElement} Родительский контейнер страницы */
	#parent

	/** @type {HTMLElement} Элемент страницы */
	#self

	/**
	 * Создает экземпляр страницы 404.
	 * @param {HTMLElement} rootElement Родительский элемент, в который рендерится страница.
	 */
	constructor(rootElement) {
		this.#parent = rootElement
	}

	/**
	 * HTML-шаблон страницы 404.
	 * Использует Handlebars для генерации разметки.
	 * @returns {string} HTML-код страницы
	 */
	get template() {
		return Handlebars.templates[`404.hbs`]()
	}

	/**
	 * Отображает страницу 404 в DOM.
	 * Создает контейнер, вставляет шаблон и очищает родительский элемент.
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.className = 'error404-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)
	}

	/**
	 * Очищает ресурсы страницы (заглушка для совместимости с интерфейсом страниц).
	 */
	destroy() {}
}
