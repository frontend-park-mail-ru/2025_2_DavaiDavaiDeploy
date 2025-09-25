import { GENRES } from '../../mocks/films.js'
import Component from '../core/baseComponent.js'

import { createPeriodFunction } from '../../helpers/launchHelper.js'

const AUTO_SLIDE_DURATION = 5000
const AUTO_SLIDE_RESTART_DURATION = 30000
const ANIMATION_DURATION = 300
const CHANGE_DURATION = 20

export default class GenreSlider extends Component {
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

	get self() {
		return document.querySelector(`.genre-slider`)
	}

	get slider() {
		return this.self.querySelector('.slider')
	}

	get nextBtn() {
		return this.self.querySelector('.next-button')
	}

	get prevBtn() {
		return this.self.querySelector('.prev-button')
	}

	get genres() {
		return Array.from(this.slider.querySelectorAll('.slider__image'))
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		this.renderGenres()
		this.initSlider()

		this.autoSlider = createPeriodFunction(
			this.onNextBthClick,
			AUTO_SLIDE_DURATION,
		)
		this.autoSlider.start()

		this.addEventListeners()
	}

	renderGenres = () => {
		this.state.genresCount = GENRES.length
		GENRES.forEach(genre => {
			const image = document.createElement('img')
			image.className = 'slider__image'
			image.alt = genre.title
			image.src = genre.image
			image.dataset = genre.id
			this.slider.appendChild(image)
		})
	}

	addEventListeners = () => {
		this.nextBtn.addEventListener('click', this.onNextBthClick)
		this.prevBtn.addEventListener('click', this.onPrevBthClick)
		this.self.addEventListener('click', this.onSliderClick)
		this.slider.addEventListener('click', this.onGenreClick)
	}

	onGenreClick = event => {
		event.preventDefault()
		event.stopPropagation()

		// const target = event.target

		// if (target.classList.contains('slider__image')) {
		// 	const id = target.dataset.id
		// }
	}

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

	initSlider = () => {
		this.genres.forEach(genre => {
			genre.style.display = 'none'
		})

		for (let index = 0; index < this.state.slideCapacity; index++) {
			const idx = (this.state.curGenre + index) % this.state.genresCount
			this.genres[idx].style.display = 'block'
		}
	}

	onNextBthClick = () => {
		this.state.prevGenre = this.state.curGenre
		this.state.curGenre =
			(this.state.curGenre + this.state.slideCapacity) % this.state.genresCount
		this.animateSlider(1)
	}

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

	animateSlider = direction => {
		if (this.state.isAnimating) {
			return
		}

		this.state.isAnimating = true
		this.nextBtn.disabled = true
		this.prevBtn.disabled = true

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
}
