import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddr } from '../../consts/serverAddr.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper.js'
import filmActions from '../../redux/features/film/actions.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'
import FilmCardPlaceholder from '../filmCardPlaceholder/filmCardPlaceholder.js'

const UPLOADING_ROWS_COUNT = 3
const ROWS_IN_BUFFER = 3
const MIN_CARD_HEIGHT = 300
const THROTTLE_DELAY = 100

export default class CardGrid extends Component {
	#unsubscribe
	#offset = 0
	#uploadAllFilms = false
	#cards = {}

	constructor(parent, props = {}) {
		super(parent, props, 'cardGrid')
	}

	get self() {
		return document.querySelector(`.card-grid`)
	}

	get grid() {
		return this.self.querySelector('.grid')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', this.html())

		this.#unsubscribe = store.subscribe(() => {
			const films = store.getState().film
			this.renderNewCards(films)
		})

		const cardsPerRow = getGridColumnCount(this.grid)
		store.dispatch(
			filmActions.getFilmsAction(
				cardsPerRow * UPLOADING_ROWS_COUNT,
				this.#offset,
			),
		)
		this.#offset += cardsPerRow * UPLOADING_ROWS_COUNT

		window.addEventListener(
			'scroll',
			throttle(this.updateViewport, THROTTLE_DELAY),
		)
		window.addEventListener(
			'resize',
			throttle(this.updateViewport, THROTTLE_DELAY),
		)
	}

	updateViewport = () => {
		const { startIndex, endIndex } = this.getVisibleCards()

		const films = store.getState().film.films

		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i])
			} else {
				this.replaceFilm(films[i])
			}
		}
	}

	replaceFilm = film => {
		const filmCard = document.querySelector(`#film-${film.id}`)
		if (!filmCard) {
			return
		}
		const child = filmCard.querySelector('.placeholder')
		if (child) {
			return
		}
		const placeholder = new FilmCardPlaceholder(filmCard)
		filmCard.innerHTML = ''
		placeholder.render()
	}

	renderFilm = film => {
		let card = document.querySelector(`#film-${film.id}`)
		if (card) {
			this.#cards[film.id].rerender()
			return
		}
		let filmCard = new FilmCard(this.grid, {
			id: film.id,
			image: `${serverAddr}${film.icon}`,
			title: film.title,
			info: `${film.genres[0].title}, ${film.year}`,
			rating: film.rating,
		})
		this.#cards[film.id] = filmCard
		filmCard.render()
	}

	getVisibleCards = () => {
		const cards = this.grid.querySelectorAll('.film-card')
		let minHeight = 0
		if (cards.length > 0) {
			minHeight = Math.min(
				...Array.from(cards).map(
					filmCard => filmCard.getBoundingClientRect().height,
				),
			)
		}

		const cardHeight = minHeight !== 0 ? minHeight : MIN_CARD_HEIGHT

		const cardsPerRow = getGridColumnCount(this.grid)
		const films = store.getState().film.films

		const scrollTop = window.scrollY

		const gridRect = this.grid.getBoundingClientRect()
		const gridTop = gridRect.top + scrollTop

		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.max(
			Math.floor(invisibleTopHeight / cardHeight) - ROWS_IN_BUFFER,
			0,
		)
		const rowsInViewPort =
			Math.ceil(window.innerHeight / cardHeight) + ROWS_IN_BUFFER

		const startIndex = rowsBeforeStart * cardsPerRow
		const endIndex = startIndex + rowsInViewPort * cardsPerRow

		const length = films.length

		if (endIndex > length) {
			if (this.#uploadAllFilms) {
				return {
					startIndex: length - cardsPerRow * rowsInViewPort,
					endIndex: length,
				}
			}
			store.dispatch(
				filmActions.getFilmsAction(
					cardsPerRow * UPLOADING_ROWS_COUNT,
					this.#offset,
				),
			)
			this.#offset += cardsPerRow * UPLOADING_ROWS_COUNT
			return {
				startIndex: length - cardsPerRow * rowsInViewPort,
				endIndex: length,
			}
		}

		return {
			startIndex,
			endIndex,
		}
	}

	renderNewCards = state => {
		if (state.loading) {
			return
		}

		if (state.error) {
			this.#uploadAllFilms = true
			return
		}

		for (let i = 0; i < state.films.length; i++) {
			this.renderFilm(state.films[i])
		}
		this.updateViewport()
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
