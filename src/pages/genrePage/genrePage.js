import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddrForStatic } from '../../consts/serverAddr.js'
import genreActions from '../../redux/features/genre/actions.js'
import { store } from '../../redux/store.js'

export default class GenrePage {
	#parent
	#self
	#unsubscribe
	#isLoaded = false
	#props = {
		id: '',
	}

	constructor(rootElement, props) {
		this.#parent = rootElement
		this.#props = { ...this.#props, ...props }
	}

	get template() {
		const context = {
			title: this.#props.title,
			description: this.#props.description,
		}
		return Handlebars.templates['genrePage.hbs'](context)
	}

	get films() {
		return this.#self.querySelector('.films')
	}

	get grid() {
		if (!this.#self) {
			return null
		}
		return this.#self.querySelector('.grid')
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.className = 'genre-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML(
			'afterbegin',
			Handlebars.templates['genrePage.hbs'](),
		)
		window.scrollTo(0, 0)

		this.#unsubscribe = store.subscribe(() => {
			const state = store.getState().genre
			this.update(state)
		})

		if (!this.#isLoaded) {
			store.dispatch(genreActions.getGenreFilmsAction(this.#props.id))
			store.dispatch(genreActions.getGenreAction(this.#props.id))
			this.#isLoaded = true
		}
	}

	update = state => {
		if (state.genreLoading || state.genreFilmsLoading) {
			return
		}

		const title = this.#self.querySelector('.genre-content__title')
		const desc = this.#self.querySelector('.genre-content__description')

		if (title) {
			title.textContent = `Жанры: ${state.curGenre.title}`
		}
		if (desc) {
			desc.textContent = state.curGenre.description
		}

		this.grid.innerHTML = ''

		state.genreFilms.forEach(film => {
			const filmCard = new FilmCard(this.grid, {
				id: film.id,
				image: `${serverAddrForStatic}${film.icon}`,
				title: film.title,
				info: `${film.genres[0].title}, ${film.year}`,
				rating: film.rating,
			})
			filmCard.render()
		})
	}

	destroy() {
		this.#unsubscribe?.()
		this.#isLoaded = false
	}
}
