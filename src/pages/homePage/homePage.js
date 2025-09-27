import FilmCard from '../../components/filmCard/filmCard.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import { serverAddr } from '../../consts/serverAddr.js'
import { TOPFILM } from '../../mocks/films.js'
import filmActions from '../../redux/features/film/actions.js'
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

	get grid() {
		return this.#self.querySelector('.grid')
	}

	get main() {
		return this.#self.querySelector('.main')
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.class = 'home-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		store.dispatch(filmActions.getFilmsAction(100, 0))

		this.#unsubscribe = store.subscribe(() => {
			const { films } = store.getState().film
			this.update(films)
		})

		const genreSlider = new GenreSlider(this.main)
		genreSlider.render()

		let topFilm = new TopFilm(this.main, {
			id: TOPFILM.id,
			image: TOPFILM.image,
			title: TOPFILM.title,
			year: TOPFILM.year,
			genre: TOPFILM.genre,
			duration: TOPFILM.duration,
			desription: TOPFILM.desription,
			rating: 9.7,
		})
		topFilm.render()
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

		state.forEach(film => {
			let filmCard = new FilmCard(this.grid, {
				id: film.id,
				image: `${serverAddr}${film.icon}`,
				title: film.title,
				info: `${film.genres[0].title}, ${film.year}`,
				rating: film.rating,
			})
			filmCard.render()
		})
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
