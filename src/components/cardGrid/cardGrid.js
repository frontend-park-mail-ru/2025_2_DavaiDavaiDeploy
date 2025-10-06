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
const ROWS_IN_BUFFER = 2
const MIN_CARD_HEIGHT = 300
const THROTTLE_DELAY = 100

export default class CardGrid extends Component {
	#unsubscribe
	#offset = 0
	#uploadAllFilms = false
	#cards = {}
	#isLoading = false
	#lastScrollTop = 0
	#hasUserScrolled = false
	#throttledScrollHandler
	#throttledResizeHandler

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

		const cardsPerRow = getGridColumnCount(this.grid)
		this.loadMoreFilms(cardsPerRow * UPLOADING_ROWS_COUNT)

		this.#throttledScrollHandler = throttle(this.onScroll, THROTTLE_DELAY)
		this.#throttledResizeHandler = throttle(this.updateViewport, THROTTLE_DELAY)
		window.addEventListener('scroll', this.#throttledScrollHandler)
		window.addEventListener('resize', this.#throttledResizeHandler)
	}

	handleStoreUpdate = () => {
		const films = selectFilmSection(store.getState())
		this.renderNewCards(films)
	}

	onScroll = () => {
		this.#hasUserScrolled = true
		this.updateViewport()
	}

	loadMoreFilms = count => {
		if (this.#isLoading || this.#uploadAllFilms) {
			return
		}
		this.#isLoading = true
		store
			.dispatch(filmActions.getFilmsAction(count, this.#offset))
			.finally(() => {
				this.#isLoading = false
			})
		this.#offset += count
	}

	updateViewport = () => {
		if (!this.grid) {
			return
		}

		const currentScrollTop = window.scrollY
		const isScrollingDown = currentScrollTop >= this.#lastScrollTop
		this.#lastScrollTop = currentScrollTop

		const gridRect = this.grid.getBoundingClientRect()
		const scrollTop = window.scrollY
		const gridTop = gridRect.top + scrollTop
		const viewportBottom = scrollTop + window.innerHeight
		const isGridVisible = viewportBottom >= gridTop

		if (!isGridVisible) {
			return
		}

		const { startIndex, endIndex } = this.getVisibleCards()
		const films = selectFilms(store.getState())

		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i])
			} else {
				this.replaceFilm(films[i])
			}
		}

		if (isScrollingDown && this.#hasUserScrolled) {
			const cards = this.grid.querySelectorAll('.film-card')
			let minHeight = 0
			if (cards.length > 0) {
				minHeight = Math.min(
					...Array.from(cards).map(card => card.getBoundingClientRect().height),
				)
			}

			const cardHeight = minHeight !== 0 ? minHeight : MIN_CARD_HEIGHT
			const gridBottom = gridTop + this.grid.scrollHeight
			const nearBottomThreshold = ROWS_IN_BUFFER * cardHeight
			const isNearBottom = viewportBottom + nearBottomThreshold >= gridBottom

			if (isNearBottom) {
				const cardsPerRow = getGridColumnCount(this.grid)
				this.loadMoreFilms(cardsPerRow * UPLOADING_ROWS_COUNT)
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
		const card = this.#cards[film.id]
		if (card) {
			card.rerender()
			return
		}
		const filmCard = new FilmCard(this.grid, {
			id: film.id,
			image: `${serverAddrForStatic}${film.icon}`,
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
			const heights = Array.from(cards)
				.map(card => card.getBoundingClientRect().height)
				.filter(h => h > 0)
			if (heights.length > 0) {
				minHeight = Math.min(...heights)
			}
		}

		const cardHeight = minHeight !== 0 ? minHeight : MIN_CARD_HEIGHT
		const cardsPerRow = getGridColumnCount(this.grid)
		const films = selectFilms(store.getState())
		const scrollTop = window.scrollY
		const gridRect = this.grid.getBoundingClientRect()
		const gridTop = gridRect.top + scrollTop
		const viewportBottom = scrollTop + window.innerHeight

		if (viewportBottom < gridTop) {
			return { startIndex: 0, endIndex: 0 }
		}

		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.max(
			Math.floor(invisibleTopHeight / cardHeight) - ROWS_IN_BUFFER,
			0,
		)
		const visibleRows = Math.ceil(window.innerHeight / cardHeight)
		const rowsInViewPort = visibleRows + 2 * ROWS_IN_BUFFER

		let startIndex = rowsBeforeStart * cardsPerRow
		let endIndex = startIndex + rowsInViewPort * cardsPerRow
		const length = films.length

		if (endIndex > length) {
			endIndex = length
			startIndex = Math.max(0, endIndex - rowsInViewPort * cardsPerRow)
		}

		return { startIndex, endIndex }
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
		if (this.#throttledScrollHandler) {
			window.removeEventListener('scroll', this.#throttledScrollHandler)
		}
		if (this.#throttledResizeHandler) {
			window.removeEventListener('resize', this.#throttledResizeHandler)
		}

		this.#cards = {}
		this.#offset = 0
		this.#uploadAllFilms = false
		this.#isLoading = false
		this.#lastScrollTop = 0
		this.#hasUserScrolled = false
		this.#throttledScrollHandler = undefined
		this.#throttledResizeHandler = undefined

		store.dispatch(filmActions.clearFilmsAction())

		if (this.self) {
			this.self.innerHTML = ''
		}
	}
}
