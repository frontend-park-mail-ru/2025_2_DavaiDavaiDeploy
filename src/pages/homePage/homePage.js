import FilmCard from '../../components/filmCard/filmCard.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper.js'
import { TOPFILM } from '../../mocks/films.js'
import filmActions from '../../redux/features/film/actions.js'
import { store } from '../../redux/store.js'

export default class Home {
	#parent
	#self
	#unsubscribe
	#offset = 0
	#limit = 12
	#loading = false
	#lastShownFilmIndex = 0

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

	get trigger() {
		return this.#self.querySelector('.load-more-trigger')
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.class = 'home-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		this.fakeCard = document.createElement('div')
		this.fakeCard.class = 'film-card'

		this.#unsubscribe = store.subscribe(() => {
			const { films } = store.getState().film
			this.update(films)
		})

		this.#limit = getGridColumnCount(this.grid) * 2

		store.dispatch(filmActions.getFilmsActionFake(this.#limit, this.#offset))

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
		})
		topFilm.render()

		const handleIntersect = throttle(async entries => {
			if (entries[0].isIntersecting && !this.#loading) {
				this.#loading = true
				store.dispatch(
					filmActions.getFilmsActionFake(this.#limit, this.#offset),
				)
				this.#offset += this.#limit
				this.#loading = false
			}
		}, 100)

		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 0.2,
		})
		observer.observe(this.trigger)
	}

	update(state) {
		// this.grid.appendChild(a)

		const container = this.#self

		if (state.loading) {
			container.insertAdjacentHTML('beforeend', '<p>Загрузка...</p>')
			return
		}

		if (state.error) {
			container.insertAdjacentHTML('beforeend', `<p>Ошибка: ${state.error}</p>`)
			return
		}

		for (let i = this.#lastShownFilmIndex + 1; i < state.length; i++) {
			let film = state[i]
			let filmCard = new FilmCard(this.grid, {
				id: film.id,
				image: '/src/assets/img/1+1.webp',
				title: film.title,
				info: `${film.year}, ${film.title}`,
				rating: film.rating,
			})
			filmCard.render()
		}
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
