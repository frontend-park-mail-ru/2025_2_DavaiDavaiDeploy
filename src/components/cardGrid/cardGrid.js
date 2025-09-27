import FilmCard from '../../components/filmCard/filmCard.js'
import { getGridColumnCount } from '../../helpers/columnCountHelper.js'
import { throttle } from '../../helpers/throttleHelper.js'
import filmActions from '../../redux/features/film/actions.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'
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
		store.dispatch(filmActions.getFilmsAction(cardsPerRow * 3, this.#offset))
		this.#offset += cardsPerRow * 3

		window.addEventListener('scroll', throttle(this.updateViewport, 100))
	}

	updateViewport = () => {
		let { startIndex, endIndex } = this.getVisibleCards()

		let films = store.getState().film.films

		for (let i = 0; i < films.length; i++) {
			if (startIndex <= i && i < endIndex) {
				this.renderFilm(films[i])
			} else {
				this.removeFilm(films[i])
			}
		}
	}

	removeFilm = film => {
		let filmCard = document.querySelector(`#film-${film.id}`)
		if (filmCard) {
			const сhild = filmCard.querySelector('.placeholder')
			if (!сhild) {
				const cardStyles = getComputedStyle(filmCard)
				const cardWidth = filmCard.offsetWidth + 'px'
				const cardHeight = filmCard.offsetHeight + 'px'
				const placeholder = document.createElement('div')
				placeholder.className = 'placeholder'
				placeholder.style.width = cardWidth
				placeholder.style.height = cardHeight
				placeholder.style.backgroundColor = 'transparent'
				placeholder.style.display = 'block'
				placeholder.style.borderRadius = cardStyles.borderRadius
				filmCard.innerHTML = ''
				filmCard.appendChild(placeholder)
			}
		}
	}

	renderFilm = film => {
		let card = document.querySelector(`#film-${film.id}`)
		if (card) {
			this.#cards[film.id].rerender()
			return
		}
		let filmCard = new FilmCard(this.grid, {
			id: film.id,
			image: '/src/assets/img/1+1.webp',
			title: film.title,
			info: `${film.year}, ${film.title}`,
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
				...Array.from(cards).map(filmCard => filmCard.offsetHeight),
			)
		}
		const cardHeight = minHeight

		const cardsPerRow = getGridColumnCount(this.grid)
		const films = store.getState().film.films

		const gridRect = this.grid.getBoundingClientRect()
		const gridTop = gridRect.top + window.pageYOffset

		const scrollTop = window.pageYOffset

		const invisibleTopHeight = Math.max(0, scrollTop - gridTop)
		const rowsBeforeStart = Math.max(
			Math.floor(invisibleTopHeight / cardHeight) - 1,
			0,
		)
		const rowsInViewPort = 3

		const startIndex = rowsBeforeStart * cardsPerRow
		const endIndex = startIndex + rowsInViewPort * cardsPerRow

		if (endIndex > films.length && !this.#uploadAllFilms) {
			store.dispatch(filmActions.getFilmsAction(cardsPerRow * 3, this.#offset))
			this.#offset += cardsPerRow * 3
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
