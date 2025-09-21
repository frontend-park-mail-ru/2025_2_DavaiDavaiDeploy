import HTTPClient from '../../modules/HTTPClient/index.js'

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
		this.#self.id = 'home-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		HTTPClient.get('/todos', { params: { limit: 20 } })
			.then(resp => {
				let data = resp.data
				data.todos.forEach(todo => {
					const todoElement = document.createElement('div')
					todoElement.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.todo}</span>
            `
					this.#self.appendChild(todoElement)
				})
			})
			.catch(error => {
				console.error('Ошибка:', error)
			})
	}
}
