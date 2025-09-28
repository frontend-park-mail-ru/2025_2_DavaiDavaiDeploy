import CardGrid from '../../components/cardGrid/cardGrid.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import { TOPFILM } from '../../mocks/films.js'

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

	get main() {
		return this.#self.querySelector('.main')
	}

	get films() {
		return this.#self.querySelector('.films')
	}

	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.class = 'home-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML('afterbegin', this.template)

		this.genreSlider = new GenreSlider(this.main)
		this.genreSlider.render()

		this.cardGrid = new CardGrid(this.films)
		this.cardGrid.render()

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

	destroy() {
		this.#unsubscribe?.()
		this.cardGrid.destroy()
		this.genreSlider.destroy()
	}
}
