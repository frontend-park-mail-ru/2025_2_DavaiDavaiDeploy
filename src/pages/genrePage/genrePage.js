import FilmCard from '../../components/filmCard/filmCard.js'
import { serverAddrForStatic } from '../../consts/serverAddr.js'
import genreActions from '../../redux/features/genre/actions.js'
import { selectGenreSection } from '../../redux/features/genre/selectors.js'
import { store } from '../../redux/store.js'
import Page from '../core/basePage.js'

/**
 * Класс страницы жанра.
 * Загружает информацию о жанре и фильмы этого жанра.
 */
export default class GenrePage extends Page {
	/**
	 * @param {HTMLElement} rootElement Родительский контейнер
	 * @param {Object} location Объект локации
	 */
	constructor(rootElement, location) {
		super(rootElement, location, 'genrePage')
	}

	/** @returns {HTMLElement} Контейнер с фильмами */
	get films() {
		return this.self.querySelector('.films')
	}

	/** @returns {HTMLElement|null} Сетка фильмов */
	get grid() {
		return this.self.querySelector('.grid')
	}

	/**
	 * Рендер страницы: создаёт элемент, вставляет шаблон, подписывается на Redux
	 */
	render() {
		this.parent.innerHTML = ''
		this.parent.insertAdjacentHTML(
			'afterbegin',
			this.template({
				title: this.props.title,
				description: this.props.description,
			}),
		)
		window.scrollTo(0, 0)

		this.unsubscribe = store.subscribe(this.handleStoreUpdate)

		store.dispatch(
			genreActions.getGenreFilmsAction(this.props.location.params.id),
		)
		store.dispatch(genreActions.getGenreAction(this.props.location.params.id))
	}

	/**
	 * Обработчик обновлений Redux.
	 * Вызывается при изменении состояния.
	 */
	handleStoreUpdate = () => {
		const state = selectGenreSection(store.getState())
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

		const title = this.self.querySelector('.genre-content__title')
		const desc = this.self.querySelector('.genre-content__description')

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
}
