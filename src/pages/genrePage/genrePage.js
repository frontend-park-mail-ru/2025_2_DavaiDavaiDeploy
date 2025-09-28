import CardGrid from '../../components/cardGrid/cardGrid.js'
import genreActions from '../../redux/features/genre/actions.js'
import { store } from '../../redux/store.js'

export default class GenrePage {
	#parent
	#self
	#unsubscribe
	#props = {
		id: '836c0da0-7862-4cca-8123-6aa73666fcab',
		title: '',
		description: '',
	}

	constructor(rootElement) {
		this.#parent = rootElement
	}

	get template() {
		const context = {
			title: this.#props.title,
			description: this.#props.description,
		}
		return Handlebars.templates[`genrePage.hbs`](context)
	}

	get films() {
		return this.#self.querySelector('.films')
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.class = 'genre-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		this.#unsubscribe = store.subscribe(() => {
			const g = store.getState().genre
			this.update(g)
		})

		store.dispatch(genreActions.getGenreAction(this.#props.id))

		const cardGrid = new CardGrid(this.films)
		cardGrid.render()
	}

	update = state => {
		this.#props.title = state
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
