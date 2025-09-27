import FilmCard from '../../components/filmCard/filmCard.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper.js'
import filmActions from '../../redux/features/film/actions.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'
export default class CardGrid extends Component {
	#unsubscribe
	#offset = 0
	#lastScrollY = 0
	#uploadAllFilms = false

	constructor(parent, props = {}) {
		super(parent, props, 'cardGrid')
	}

	get self() {
		return document.querySelector(`.card-grid`)
	}

	get grid() {
		return this.self.querySelector('.grid')
	}

	get trigger() {
		return this.self.querySelector('.load-more-trigger')
	}

	get topSpacer() {
		return this.self.querySelector('.top-spacer')
	}

	render() {
		this.parent.insertAdjacentHTML('beforeend', this.html())

		this.#unsubscribe = store.subscribe(() => {
			const films = store.getState().film
			this.renderNewCards(films)
		})

		this.updateViewport()

		window.addEventListener('scroll', throttle(this.updateViewport, 100))
	}

	updateViewport = () => {
		let { startIndex, endIndex, topSpacerHeight } = this.getVisibleCards()

		let renderWay = 'afterbegin'
		if (window.scrollY > this.#lastScrollY) {
			renderWay = 'beforeend'
		}

		this.#lastScrollY = window.scrollY

		let films = store.getState().film.films
		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i], renderWay)
			} else {
				this.removeFilm(films[i])
			}
		}
		this.topSpacer.style.height = `${topSpacerHeight}px`
	}

	removeFilm = film => {
		let filmCard = document.querySelector(`#film-${film.id}`)
		if (filmCard) {
			filmCard.remove()
		}
	}

	getVisibleCards = () => {
		const cards = this.grid.querySelectorAll('.film-card')
		let maxHeight = 0
		if (cards.length > 0) {
			maxHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight))
		}

		const cardsPerRow = getGridColumnCount(this.grid)
		const films = store.getState().film.films

		if (cards.length == 0 && !this.#uploadAllFilms) {
			store.dispatch(filmActions.getFilmsAction(cardsPerRow, this.#offset))
			this.#offset += cardsPerRow
			return { startIndex: 0, endIndex: cardsPerRow, topSpacerHeight: 0 }
		}

		const cardHeight = maxHeight
		const gridRect = this.grid.getBoundingClientRect()
		const gridTop = gridRect.top + window.pageYOffset

		const scrollTop = window.pageYOffset
		const viewportHeight = window.innerHeight

		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.floor(invisibleTopHeight / cardHeight)
		const rowsInViewPort = Math.ceil(viewportHeight / cardHeight)

		const bufferRows = 2
		const startRow = Math.max(0, rowsBeforeStart)
		const endRow = rowsBeforeStart + rowsInViewPort + bufferRows

		const startIndex = startRow * cardsPerRow
		const endIndex = endRow * cardsPerRow

		if (endIndex > films.length && !this.#uploadAllFilms) {
			const neededCardsCount = endIndex - films.length
			store.dispatch(
				filmActions.getFilmsAction(neededCardsCount * 2, this.#offset),
			)
			this.#offset += neededCardsCount
		}

		let height = 0
		for (let row = 0; row < startRow; row++) {
			const startIdx = row * cardsPerRow
			const endIdx = startIdx + cardsPerRow
			const rowCards = Array.from(cards).slice(startIdx, endIdx)

			if (rowCards.length > 0) {
				const rowHeight = Math.max(...rowCards.map(card => card.offsetHeight))
				height += rowHeight
			}
		}

		return {
			startIndex,
			endIndex,
			height,
		}
	}

	renderFilm = (film, renderWay) => {
		if (document.querySelector(`#film-${film.id}`)) {
			return
		}
		let filmCard = new FilmCard(this.grid, {
			id: film.id,
			image: '/src/assets/img/1+1.webp',
			title: film.title,
			info: `${film.year}, ${film.title}`,
			rating: film.rating,
			renderWay,
		})
		filmCard.render()
	}

	renderNewCards = state => {
		if (state.loading) {
			return
		}

		if (state.error) {
			this.#uploadAllFilms = true
			return
		}
	}

	destroy() {
		this.#unsubscribe?.()
	}
}
