import CardGrid from '../../components/cardGrid/cardGrid.js'
import GenreSlider from '../../components/genreSlider/genreSlider.js'
import TopFilm from '../../components/topFilm/topFilm.js'
import { TOPFILM } from '../../mocks/films.js'
import Page from '../core/basePage.js'
/**
 * Класс для отображения главной страницы.
 */
export default class Home extends Page {
	/**
	 * @param {HTMLElement} rootElement - Родительский DOM-элемент.
	 */
	constructor(rootElement, location) {
		super(rootElement, location, 'homePage')
	}

	/**
	 * Ссылка на `.main` внутри страницы.
	 * @returns {HTMLElement | null}
	 */
	get main() {
		return this.self.querySelector('.main')
	}

	/**
	 * Ссылка на `.films` внутри страницы.
	 * @returns {HTMLElement | null}
	 */
	get films() {
		return this.self.querySelector('.films')
	}

	/**
	 * Рендерит главную страницу: слайдер жанров, карточки фильмов и TopFilm.
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML('afterbegin', this.template())

		this.genreSlider = new GenreSlider(this.main)
		this.genreSlider.render()

		this.cardGrid = new CardGrid(this.films)
		this.cardGrid.render()

		const topFilm = new TopFilm(this.main, {
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

	/**
	 * Очистка/отписка от событий (если реализовано).
	 */
	destroy() {
		this.cardGrid.destroy()
		this.genreSlider.destroy()
	}
}
