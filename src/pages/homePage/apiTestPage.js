import { fetchTodos } from '../../redux/features/todos/actions.js'
import { store } from '../../redux/store.js'

export default class Home {
	#parent
	#self
	#unsubscribe

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

		store.dispatch(fetchTodos('/todos', 20))

		this.#unsubscribe = store.subscribe(() => {
			const { todos } = store.getState()
			this.update(todos)
		})
	}

	update(state) {
		const container = this.#self
		container.querySelectorAll('.todo-item').forEach(el => el.remove())

		if (state.loading) {
			container.insertAdjacentHTML('beforeend', '<p>Загрузка...</p>')
			return
		}

		if (state.error) {
			container.insertAdjacentHTML('beforeend', `<p>Ошибка: ${state.error}</p>`)
			return
		}

		state.todos.forEach(todo => {
			const todoElement = document.createElement('div')
			todoElement.classList.add('todo-item')
			todoElement.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span>${todo.todo}</span>
      `
			container.appendChild(todoElement)
		})
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
