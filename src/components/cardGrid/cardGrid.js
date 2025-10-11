import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddrForStatic } from '../../consts/serverAddr.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper/throttleHelper.js'
import filmActions from '../../redux/features/film/actions.js'
import {
	selectFilmSection,
	selectFilms,
} from '../../redux/features/film/selectors.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'

const UPLOADING_ROWS_COUNT = 3
const THROTTLE_DELAY = 100
const ROOT_MARGIN = '500px'

export default class CardGrid extends Component {
	#unsubscribe
	#offset = 0
	#uploadAllFilms = false
	#throttledIntersectHandler
	#receivedFilms = new Set()
	#observer

	constructor(parent, props = {}) {
		super(parent, props, 'cardGrid')
	}

	get self() {
		return document.querySelector(`.card-grid`)
	}

	get grid() {
		return this.self?.querySelector('.grid')
	}

	get trigger() {
		return this.self?.querySelector('.load-more-trigger')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', this.html())

		this.#unsubscribe = store.subscribe(this.handleStoreUpdate)

		this.#throttledIntersectHandler = throttle(
			this.handleIntersect,
			THROTTLE_DELAY,
		)

		this.#observer = new IntersectionObserver(this.#throttledIntersectHandler, {
			rootMargin: ROOT_MARGIN,
		})

		this.#observer.observe(this.trigger)
	}

	handleIntersect = () => {
		const cardsPerRow = getGridColumnCount(this.grid)
		this.loadMoreFilms(cardsPerRow * UPLOADING_ROWS_COUNT)
	}

	loadMoreFilms = count => {
		if (this.#uploadAllFilms) {
			return
		}
		store.dispatch(filmActions.getFilmsAction(count, this.#offset))
		this.#offset += count
	}

	handleStoreUpdate = () => {
		const films = selectFilmSection(store.getState())
		this.addNewCards(films)
	}

	addNewCards = state => {
		if (state.loading) {
			return
		}
		if (state.error) {
			this.#uploadAllFilms = true
		}

		const films = selectFilms(store.getState())
		for (let i = 0; i < films.length; i++) {
			this.renderFilm(films[i])
		}
	}

	renderFilm = film => {
		if (this.#receivedFilms.has(film.id)) {
			return
		}
		const filmCard = new FilmCard(this.grid, {
			id: film.id,
			image: `${serverAddrForStatic}${film.icon}`,
			title: film.title,
			info: `${film.genres[0].title}, ${film.year}`,
			rating: film.rating,
		})
		this.#receivedFilms.add(film.id)
		filmCard.render()
	}

	destroy() {
		this.#unsubscribe?.()

		store.dispatch(filmActions.clearFilmsAction())
		this.#uploadAllFilms = false

		this.#observer.unobserve(this.trigger)

		if (this.self) {
			this.self.innerHTML = ''
		}
	}
}
