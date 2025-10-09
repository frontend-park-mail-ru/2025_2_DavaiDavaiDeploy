import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddrForStatic } from '../../consts/serverAddr.js'
import genreActions from '../../redux/features/genre/actions.js'
import { store } from '../../redux/store.js'

/**
 * Класс страницы жанра.
 * Загружает информацию о жанре и фильмы этого жанра.
 */
export default class GenrePage {
	/** @type {HTMLElement} Родительский контейнер страницы */
	#parent

	/** @type {HTMLElement} Элемент страницы */
	#self

	/** @type {Function} Функция отписки от обновлений Redux */
	#unsubscribe

	/** @type {boolean} Флаг, указывающий, загружены ли данные */
	#isLoaded = false

	/** @type {Object} Свойства страницы */
	#props = {
		location: {},
	}

	/**
	 * @param {HTMLElement} rootElement Родительский контейнер
	 * @param {Object} location Объект локации (например, { params: { id: '1' } })
	 */
	constructor(rootElement, location) {
		this.#parent = rootElement
		this.#props = { ...this.#props, location }
	}

	/**
	 * Шаблон страницы жанра.
	 * @returns {string} HTML-код страницы
	 */
	get template() {
		const location = {
			title: this.#props.title,
			description: this.#props.description,
		}
		return Handlebars.templates['genrePage.hbs'](location)
	}

	/** @returns {HTMLElement} Контейнер с фильмами */
	get films() {
		return this.#self.querySelector('.films')
	}

	/** @returns {HTMLElement|null} Сетка фильмов */
	get grid() {
		if (!this.#self) {
			return null
		}
		return this.#self.querySelector('.grid')
	}

	/**
	 * Рендер страницы: создаёт элемент, вставляет шаблон, подписывается на Redux
	 */
	render() {
		this.#parent.innerHTML = ''
		this.#self = document.createElement('div')
		this.#self.className = 'genre-page'
		this.#parent.appendChild(this.#self)
		this.#self.insertAdjacentHTML(
			'afterbegin',
			Handlebars.templates['genrePage.hbs'](),
		)
		window.scrollTo(0, 0)

		this.#unsubscribe = store.subscribe(this.handleStoreUpdate)

		if (!this.#isLoaded) {
			store.dispatch(
				genreActions.getGenreFilmsAction(this.#props.location.params.id),
			)
			store.dispatch(
				genreActions.getGenreAction(this.#props.location.params.id),
			)
			this.#isLoaded = true
		}
	}

	/**
	 * Обработчик обновлений Redux.
	 * Вызывается при изменении состояния.
	 */
	handleStoreUpdate = () => {
		const state = store.getState().genre
		this.update(state)
	}

	/**
	 * Обновляет контент страницы при изменении состояния Redux.
	 * @param {Object} state Состояние жанра из Redux
	 */
	update = state => {
		if (state.genreLoading || state.genreFilmsLoading) {
			return
		}

		const title = this.#self.querySelector('.genre-content__title')
		const desc = this.#self.querySelector('.genre-content__description')

		if (title) {
			title.textContent = `Жанры: ${state.curGenre.title}`
		}
		if (desc) {
			desc.textContent = state.curGenre.description
		}

		this.grid.innerHTML = ''

		state.genreFilms.forEach(film => {
			const filmCard = new FilmCard(this.grid, {
				id: film.id,
				image: `${serverAddrForStatic}${film.icon}`,
				title: film.title,
				info: `${film.genres[0].title}, ${film.year}`,
				rating: film.rating,
			})
			filmCard.render()
		})
	}

	/**
	 * Очищает ресурсы страницы: отписка от Redux и сброс флага загрузки
	 */
	destroy() {
		this.#unsubscribe?.()
		this.#isLoaded = false
	}
}
