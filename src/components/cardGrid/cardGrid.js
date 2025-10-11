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
import FilmCardPlaceholder from '../filmCardPlaceholder/filmCardPlaceholder.js'

const UPLOADING_ROWS_COUNT = 3
const ROWS_IN_BUFFER = 1
const THROTTLE_DELAY = 100

export default class CardGrid extends Component {
	#unsubscribe
	#offset = 0
	#uploadAllFilms = false
	#cards = {}
	#windowHeight
	#throttledResizeHandler
	#animationFrameId = null

	constructor(parent, props = {}) {
		super(parent, props, 'cardGrid')
	}

	get self() {
		return document.querySelector(`.card-grid`)
	}

	get grid() {
		return this.self?.querySelector('.grid')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', this.html())

		this.#unsubscribe = store.subscribe(this.handleStoreUpdate)

		this.handleResize()

		const cardsPerRow = getGridColumnCount(this.grid)
		this.loadMoreFilms(cardsPerRow * UPLOADING_ROWS_COUNT)

		this.#throttledResizeHandler = throttle(() => {
			requestAnimationFrame(() => {
				this.handleResize()
			})
		}, THROTTLE_DELAY)

		window.addEventListener('resize', this.#throttledResizeHandler)

		this.update()
	}

	handleStoreUpdate = () => {
		const films = selectFilmSection(store.getState())
		this.addNewCards(films)
	}

	loadMoreFilms = count => {
		if (this.#uploadAllFilms) {
			return
		}

		store.dispatch(filmActions.getFilmsAction(count, this.#offset))
		this.#offset += count
	}

	addNewCards = state => {
		if (state.loading) {
			return
		}
		if (state.error) {
			this.#uploadAllFilms = true
		}
	}

	update = () => {
		this.#animationFrameId = requestAnimationFrame(this.update)
		this.updateViewport()
	}

	handleResize = () => {
		this.#windowHeight = window.innerHeight

		const card = Array.from(document.querySelectorAll('.film-card')).find(
			el => !el.querySelector('.placeholder'),
		)

		if (!card) {
			return
		}

		const cardWidth = card.offsetWidth
		const cardHeight = card.offsetHeight

		for (const card of Object.values(this.#cards)) {
			card.resizePlaceholder(cardWidth, cardHeight)
		}

		this.updateViewport()
	}

	updateViewport = () => {
		const { startIndex, endIndex } = this.getVisibleCards()

		const films = selectFilms(store.getState())

		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i])
			} else {
				this.replaceFilm(films[i])
			}
		}
	}

	getVisibleCards = () => {
		const cardsPerRow = getGridColumnCount(this.grid)
		const card = this.grid.querySelector('.film-card')

		if (!card) {
			return { startIndex: 0, endIndex: cardsPerRow }
		}

		const cardHeight = this.grid.querySelector('.film-card').offsetHeight

		const gridRect = this.grid.getBoundingClientRect()
		const gridRectTop = gridRect.top

		if (this.#windowHeight < gridRectTop) {
			return { startIndex: 0, endIndex: cardsPerRow }
		}

		let invisibleTopHeight = Math.abs(gridRectTop)
		let visibleRows = Math.ceil(window.innerHeight / cardHeight)

		if (gridRectTop >= 0) {
			invisibleTopHeight = 0
			visibleRows = Math.ceil((this.#windowHeight - gridRectTop) / cardHeight)
		}

		const rowsBeforeStart = Math.max(
			Math.trunc(invisibleTopHeight / cardHeight) - ROWS_IN_BUFFER,
			0,
		)

		const rowsInViewPort = visibleRows + 2 * ROWS_IN_BUFFER

		let startIndex = rowsBeforeStart * cardsPerRow
		let endIndex = startIndex + rowsInViewPort * cardsPerRow

		const films = selectFilms(store.getState())
		const length = films.length

		if (endIndex > length) {
			endIndex = length
			startIndex = Math.max(0, endIndex - rowsInViewPort * cardsPerRow)

			this.loadMoreFilms(cardsPerRow * UPLOADING_ROWS_COUNT)
		}

		return { startIndex, endIndex }
	}

	renderFilm = film => {
		const card = this.#cards[film.id]
		if (!card) {
			const filmCard = new FilmCard(this.grid, {
				id: film.id,
				image: `${serverAddrForStatic}${film.icon}`,
				title: film.title,
				info: `${film.genres[0].title}, ${film.year}`,
				rating: film.rating,
			})
			this.#cards[film.id] = filmCard
			filmCard.render()
			return
		}
		const placeholder = card.self.querySelector('.placeholder')
		if (placeholder) {
			card.rerender()
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
		placeholder.render()
	}

	destroy() {
		this.#unsubscribe?.()

		window.removeEventListener('resize', this.#throttledResizeHandler)

		store.dispatch(filmActions.clearFilmsAction())
		this.#uploadAllFilms = false

		if (this.self) {
			this.self.innerHTML = ''
		}

		cancelAnimationFrame(this.#animationFrameId)
		this.#animationFrameId = null
	}
}
