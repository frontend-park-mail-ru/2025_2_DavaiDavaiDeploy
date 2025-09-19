/**
 * Базовый класс компонентов
 * @class
 * @param {HTMLElement} parent - Родительский элемент, в который будет вставлен компонент.
 * @param {Object} props - Объект с конфигурацией компонента.
 * @param {string} templateName - Название шаблона компонента(hbs).
 * @param {Object} state - Состояние компонента.
 */
export default class Component {
	#state

	constructor(parent, props, templateName, state = {}) {
		this.parent = parent
		this.props = props
		this.templateName = templateName
		this.#state = state
	}

	get self() {
		return document.getElementById(this.props.id)
	}

	get state() {
		return this.#state
	}

	setState(newState) {
		this.#state = newState
	}

	html(context) {
		return Handlebars.templates[`${this.templateName}.hbs`](context)
	}
}
