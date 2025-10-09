export default class Page {
	parent
	unsubscribe
	templateName
	props = {
		location: {},
	}

	constructor(rootElement, location, templateName) {
		this.parent = rootElement
		this.props = { ...this.props, location }
		this.templateName = templateName
	}

	get self() {
		return document.querySelector('.page')
	}

	template(context) {
		return Handlebars.templates[`${this.templateName}.hbs`](context)
	}

	destroy() {
		this.unsubscribe?.()
		if (this.parent) {
			this.parent.innerHTML = ''
		}
	}
}
