/**
 * Базовый класс Page представляет страницу приложения.
 * Отвечает за управление шаблоном, состоянием и очисткой DOM при удалении страницы.
 */
export default class Page {
	/**
	 * @type {HTMLElement}
	 * Родительский элемент, в который будет вставляться содержимое страницы.
	 */
	parent

	/**
	 * @type {Function|undefined}
	 * Функция отписки от Redux store.
	 */
	unsubscribe

	/**
	 * @type {string}
	 * Имя шаблона Handlebars, связанного со страницей.
	 */
	templateName

	/**
	 * @type {{ location: Object }}
	 * Объект с параметрами страницы.
	 */
	props = {
		location: {},
	}

	/**
	 * Создает экземпляр страницы.
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент для размещения контента страницы.
	 * @param {Object} location - Объект, содержащий данные о текущем маршруте и состоянии.
	 * @param {string} templateName - Имя Handlebars-шаблона, который используется для отрисовки страницы.
	 */
	constructor(rootElement, location, templateName) {
		this.parent = rootElement
		this.props = { ...this.props, location }
		this.templateName = templateName
	}

	/**
	 * Возвращает DOM-элемент текущей страницы.
	 * @returns {HTMLElement|null} DOM-элемент с классом `.page` или null, если элемент не найден.
	 */
	get self() {
		return document.querySelector('.page')
	}

	/**
	 * Возвращает HTML-разметку страницы, созданную на основе Handlebars-шаблона.
	 * @param {Object} context - Контекстные данные, передаваемые в шаблон.
	 * @returns {string} Сформированная HTML-разметка страницы.
	 */
	template(context) {
		return Handlebars.templates[`${this.templateName}.hbs`](context)
	}

	/**
	 * Уничтожает страницу — отписывается от событий и очищает содержимое родительского контейнера.
	 * @returns {void}
	 */
	destroy() {
		this.unsubscribe?.()
		if (this.parent) {
			this.parent.innerHTML = ''
		}
	}
}
