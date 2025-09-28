import FilmCard from '../../components/filmCard/filmCard.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import { FILMS, TOPFILM } from '../../mocks/films.js'
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

		for (let i = 0; i < 10; i++) {
			FILMS.forEach(film => {
				let filmCard = new FilmCard(this.grid, {
					id: film.id,
					image: '../../assets/img/1+1.webp',
					title: film.title,
					info: `${film.year}, ${film.genres[1].title}`,
					rating: film.rating,
				})
				filmCard.render()
			})
		}

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
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
