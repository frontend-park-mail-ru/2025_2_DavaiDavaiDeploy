import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddr } from '../../consts/serverAddr.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper.js'
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
	isDestroyed = false

	constructor(parent, props = {}) {
		super(parent, props, 'cardGrid')
		this.throttledUpdateViewport = throttle(this.updateViewport, THROTTLE_DELAY)
	}

	get self() {
		return document.querySelector(`.card-grid`) || null
	}

	get grid() {
		const self = this.self
		if (!self) {
			return null
		}
		return self.querySelector('.grid')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', this.html())

		this.#unsubscribe = store.subscribe(() => {
			if (this.isDestroyed) {
				return
			}
			const films = this.props.getSection(store.getState())
			this.renderNewCards(films)
		})

		const grid = this.grid
		if (!grid) {
			return
		}
		const cardsPerRow = getGridColumnCount(grid)
		store.dispatch(
			this.props.getAction(cardsPerRow * UPLOADING_ROWS_COUNT, this.#offset),
		)
		this.#offset += cardsPerRow * UPLOADING_ROWS_COUNT

		window.addEventListener('scroll', this.throttledUpdateViewport)
		window.addEventListener('resize', this.throttledUpdateViewport)
	}

	updateViewport = () => {
		if (this.isDestroyed) {
			return
		}

		const grid = this.grid
		if (!grid) {
			return
		}

		const { startIndex, endIndex } = this.getVisibleCards()
		const films = this.props.getFilms(store.getState())

		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i])
			} else {
				this.replaceFilm(films[i])
			}
		}
	}

	replaceFilm = film => {
		if (this.isDestroyed) {
			return
		}

		const filmCard = document.querySelector(`#film-${film.id}`)
		if (!filmCard) {
			return
		}
		if (filmCard.querySelector('.placeholder')) {
			return
		}

		const placeholder = new FilmCardPlaceholder(filmCard)
		filmCard.innerHTML = ''
		placeholder.render()
	}

	renderFilm = film => {
		if (this.isDestroyed) {
			return
		}

		const grid = this.grid
		if (!grid) {
			return
		}

		let card = document.querySelector(`#film-${film.id}`)
		if (card && this.#cards[film.id]) {
			this.#cards[film.id].rerender()
			return
		}

		const filmCard = new FilmCard(grid, {
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
		if (this.isDestroyed) {
			return { startIndex: 0, endIndex: 0 }
		}

		const grid = this.grid
		if (!grid) {
			return { startIndex: 0, endIndex: 0 }
		}

		const cards = grid.querySelectorAll('.film-card')
		const minHeight = cards.length
			? Math.min(
					...Array.from(cards).map(c => c.getBoundingClientRect().height),
				)
			: MIN_CARD_HEIGHT

		const cardHeight = minHeight || MIN_CARD_HEIGHT
		const cardsPerRow = getGridColumnCount(grid)
		const films = this.props.getFilms(store.getState())

		const scrollTop = window.scrollY
		const gridRect = grid.getBoundingClientRect()
		const gridTop = gridRect.top + scrollTop
		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.max(
			Math.floor(invisibleTopHeight / cardHeight) - ROWS_IN_BUFFER,
			0,
		)
		const rowsInViewPort =
			Math.ceil(window.innerHeight / cardHeight) + ROWS_IN_BUFFER

		let startIndex = rowsBeforeStart * cardsPerRow
		let endIndex = startIndex + rowsInViewPort * cardsPerRow

		const length = films.length

		if (endIndex > length) {
			if (this.#uploadAllFilms) {
				startIndex = Math.max(length - rowsInViewPort * cardsPerRow, 0)
				endIndex = length
			} else {
				store.dispatch(
					this.props.getAction(
						cardsPerRow * UPLOADING_ROWS_COUNT,
						this.#offset,
					),
				)
				this.#offset += cardsPerRow * UPLOADING_ROWS_COUNT
				startIndex = Math.max(length - rowsInViewPort * cardsPerRow, 0)
				endIndex = length
			}
		}

		return { startIndex, endIndex }
	}

	renderNewCards = state => {
		if (this.isDestroyed) {
			return
		}
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
		this.isDestroyed = true

		this.#unsubscribe?.()
		window.removeEventListener('scroll', this.throttledUpdateViewport)
		window.removeEventListener('resize', this.throttledUpdateViewport)

		this.#cards = {}
		this.#offset = 0
		this.#uploadAllFilms = false

		if (this.self) {
			this.self.innerHTML = ''
		}
	}
}
