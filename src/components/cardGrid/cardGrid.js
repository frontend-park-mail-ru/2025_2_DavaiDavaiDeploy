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
	#throttledScrollHandler
	#throttledResizeHandler
	#animationFrameId = null

	#cardsPerRow
	#windowHeight

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

		this.calculate()

		this.loadMoreFilms(this.#cardsPerRow * UPLOADING_ROWS_COUNT)

		this.#throttledResizeHandler = throttle(this.calculate, THROTTLE_DELAY)
		window.addEventListener('resize', this.#throttledResizeHandler)

		this.tick()
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
			return
		}
	}

	tick = () => {
		this.#animationFrameId = requestAnimationFrame(this.tick)
		this.updateViewport()
	}

	calculate = () => {
		this.#cardsPerRow = getGridColumnCount(this.grid)
		this.#windowHeight = window.innerHeight
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
		const cardHeight = this.grid.querySelector('.film-card')
			? this.grid.querySelector('.film-card').offsetHeight
			: '700'

		const cardsPerRow = this.#cardsPerRow

		const gridRect = this.grid.getBoundingClientRect()
		const scrollTop = window.scrollY
		const gridTop = gridRect.top + scrollTop
		const viewportBottom = scrollTop + this.#windowHeight
		const isGridVisible = viewportBottom >= gridTop

		if (!isGridVisible || cardHeight === '700') {
			return { startIndex: 0, endIndex: cardsPerRow * 1 }
		}

		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.max(
			Math.trunc(invisibleTopHeight / cardHeight) - ROWS_IN_BUFFER,
			0,
		)

		let visibleRows = Math.ceil(this.#windowHeight / cardHeight)

		if (gridRect.top > 0) {
			visibleRows = Math.ceil((this.#windowHeight - gridRect.top) / cardHeight)
		}
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

		window.removeEventListener('scroll', this.#throttledScrollHandler)
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
