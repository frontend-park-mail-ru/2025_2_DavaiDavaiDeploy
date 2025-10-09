import Page from '../core/basePage.js'
/**
 * Класс, представляющий страницу 404 (не найдено).
 */
export default class NotFoundPage extends Page {
	/**
	 * Создает экземпляр страницы 404.
	 * @param {HTMLElement} rootElement Родительский элемент, в который рендерится страница.
	 */
	constructor(rootElement, location) {
		super(rootElement, location, 'notFoundPage')
	}

	/**
	 * Отображает страницу 404 в DOM.
	 * Вставляет шаблон и очищает родительский элемент.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('afterbegin', this.template())
	}
}
