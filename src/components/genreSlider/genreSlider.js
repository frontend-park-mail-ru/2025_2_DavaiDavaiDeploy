import { serverAddrForStatic } from '../../consts/serverAddr.js'
import { createPeriodFunction } from '../../helpers/periodStartHelper/periodStartHelper.js'
import router from '../../modules/router/index.js'
import genreActions from '../../redux/features/genre/actions.js'
import { selectGenreSection } from '../../redux/features/genre/selectors.js'
import { store } from '../../redux/store.js'
import Component from '../core/baseComponent.js'

const AUTO_SLIDE_DURATION = 7000
const AUTO_SLIDE_RESTART_DURATION = 30000
const ANIMATION_DURATION = 300
const CHANGE_DURATION = 20

/**
 * Класс GenreSlider отображает слайдер жанров с авто-перелистыванием.
 * @extends Component
 */
export default class GenreSlider extends Component {
	/** @type {Function} Отписка от обновлений Redux */
	#unsubscribe

	/**
	 * @param {HTMLElement} parent Родительский элемент для рендера
	 * @param {Object} [props={}] Дополнительные свойства компонента
	 */
	constructor(parent, props = {}) {
		super(parent, props, 'genreSlider', {
			curSlide: 0,
			slideCapacity: 8,
			slideCount: 3,
			genresCount: 0,
			curGenre: 0,
			prevGenre: 0,
			isAnimating: false,
			autoSlider: null,
			inactivityTimer: null,
		})
	}

	/** @returns {HTMLElement|null} Корневой элемент слайдера */
	get self() {
		return document.querySelector(`.genre-slider`)
	}

	/** @returns {HTMLElement|null} Контейнер для слайдов */
	get slider() {
		return this.self?.querySelector('.slider')
	}

	/** @returns {HTMLElement|null} Кнопка перехода к следующему слайду */
	get nextBtn() {
		return this.self?.querySelector('.next-button')
	}

	/** @returns {HTMLElement|null} Кнопка перехода к предыдущему слайду */
	get prevBtn() {
		return this.self?.querySelector('.prev-button')
	}

	/** @returns {HTMLElement[]} Слайды жанров */
	get genres() {
		if (!this.slider) {
			return []
		}
		return Array.from(this.slider.querySelectorAll('.slider__image'))
	}

	/**
	 * Рендерит слайдер и подписывается на обновления состояния Redux.
	 */
	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		store.dispatch(genreActions.getGenresAction())

		this.#unsubscribe = store.subscribe(this.handleStoreUpdate)

		this.addEventListeners()
	}

	/** Обработчик обновлений Redux для обновления слайдера */
	handleStoreUpdate = () => {
		const state = selectGenreSection(store.getState())
		this.update(state)
	}

	/**
	 * Обновляет содержимое слайдера.
	 * @param {Object} state Состояние Redux
	 */
	update = state => {
		const genres = state.genres

		if (!this.slider || state.genresLoading) {
			return
		}

		this.state.genresCount = genres.length
		this.slider.innerHTML = ''

		genres.forEach(genre => {
			const image = document.createElement('img')
			image.className = 'slider__image'
			image.alt = genre.title
			image.src = `${serverAddrForStatic}${genre.icon}`
			image.setAttribute('data-id', genre.id)
			this.slider.appendChild(image)
		})

		if (this.autoSlider && this.autoSlider.isWorking()) {
			this.autoSlider.stop()
		}

		if (this.autoSlider) {
			this.autoSlider.stop()
		}

		this.initSlider()

		this.autoSlider = createPeriodFunction(
			this.onNextBthClick,
			AUTO_SLIDE_DURATION,
		)
		this.autoSlider.start()
	}

	/** Добавляет слушатели событий для кнопок и слайдера */
	addEventListeners = () => {
		this.nextBtn.addEventListener('click', this.onNextBthClick)
		this.prevBtn.addEventListener('click', this.onPrevBthClick)
		this.self.addEventListener('click', this.onSliderClick)
		this.slider.addEventListener('click', this.onGenreClick)
	}

	/**
	 * Обработка клика по жанру.
	 * Переходит на страницу выбранного жанра.
	 * @param {MouseEvent} event
	 */
	onGenreClick = event => {
		event.preventDefault()
		event.stopPropagation()
		const target = event.target
		if (target.classList.contains('slider__image')) {
			const id = target.dataset.id
			router.navigate(`/genre/${id}`)
		}
	}

	/**
	 * Останавливает авто-слайдер при взаимодействии пользователя.
	 * Перезапускает его через AUTO_SLIDE_RESTART_DURATION.
	 */
	onSliderClick = () => {
		this.autoSlider.stop()
		if (this.inactivityTimer) {
			clearTimeout(this.inactivityTimer)
		}
		this.inactivityTimer = setTimeout(() => {
			if (!this.autoSlider.isWorking()) {
				this.autoSlider.start()
			}
		}, AUTO_SLIDE_RESTART_DURATION)
	}

	/** Инициализация видимых слайдов */
	initSlider = () => {
		this.genres.forEach(genre => {
			genre.style.display = 'none'
		})

		for (let index = 0; index < this.state.slideCapacity; index++) {
			const idx = (this.state.curGenre + index) % this.state.genresCount
			if (this.genres[idx]) {
				this.genres[idx].style.display = 'block'
			}
		}
	}

	/** Переход к следующему слайду */
	onNextBthClick = () => {
		this.state.prevGenre = this.state.curGenre
		this.state.curGenre =
			(this.state.curGenre + this.state.slideCapacity) % this.state.genresCount
		this.animateSlider(1)
	}

	/** Переход к предыдущему слайду */
	onPrevBthClick = () => {
		this.state.prevGenre = this.state.curGenre
		this.state.curGenre =
			this.state.curGenre - this.state.slideCapacity < 0
				? this.state.curGenre -
					this.state.slideCapacity +
					this.state.genresCount
				: this.state.curGenre - this.state.slideCapacity
		this.animateSlider(-1)
	}

	/**
	 * Анимация слайдов при перелистывании.
	 * @param {number} direction 1 - вперед, -1 - назад
	 */
	animateSlider = direction => {
		if (this.state.isAnimating) {
			return
		}
		if (this.nextBtn && this.prevBtn) {
			this.state.isAnimating = true
			this.nextBtn.disabled = true
			this.prevBtn.disabled = true
		}
		this.genres.forEach((genre, index) => {
			const inCurSlide =
				index >= this.state.prevGenre &&
				index < this.state.prevGenre + this.state.slideCapacity
			if (inCurSlide) {
				genre.style.opacity = '0'
				genre.style.transform = `translateX(${-direction * 100}%)`
			}
		})

		setTimeout(() => {
			this.genres.forEach((genre, index) => {
				const inNewSlide =
					index >= this.state.curGenre &&
					index < this.state.curGenre + this.state.slideCapacity

				genre.style.display = inNewSlide ? 'block' : 'none'

				if (inNewSlide) {
					genre.style.opacity = '0'
					genre.style.transform = `translateX(${direction * 100}%)`
				}
			})

			setTimeout(() => {
				this.genres.forEach((genre, index) => {
					const inNewSlide =
						index >= this.state.curGenre &&
						index < this.state.curGenre + this.state.slideCapacity

					if (inNewSlide) {
						genre.style.opacity = '1'
						genre.style.transform = 'translateX(0)'
					}
				})
			}, CHANGE_DURATION)

			setTimeout(() => {
				this.state.isAnimating = false
				this.nextBtn.disabled = false
				this.prevBtn.disabled = false
			}, ANIMATION_DURATION)
		}, ANIMATION_DURATION)
	}

	/** Очищает ресурсы слайдера */
	destroy() {
		this.#unsubscribe?.()

		if (this.autoSlider && this.autoSlider.isWorking()) {
			this.autoSlider.stop()
			this.autoSlider = null
		}
		if (this.inactivityTimer) {
			clearTimeout(this.inactivityTimer)
			this.inactivityTimer = null
		}
	}
}
