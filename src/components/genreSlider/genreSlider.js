import Component from '../core/baseComponent.js'

export default class GenreSlider extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'genreSlider', {
			curSlide: 0,
			slideCapacity: 8,
			slideСount: 3,
			genresCount: 24,
			curGenre: 0,
			prevGenre: 0,
			isAnimating: false,
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
		return Array.from(this.slider.querySelectorAll('a'))
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		this.initSlider()
		this.addEventListeners()
	}

	addEventListeners = () => {
		this.nextBtn.addEventListener('click', this.showNextSlide)
		this.prevBtn.addEventListener('click', this.showPreviousSlide)
	}

	showNextSlide = () => {
		this.state.prevGenre = this.state.curGenre
		this.state.curGenre =
			(this.state.curGenre + this.state.slideCapacity) % this.state.genresCount
		this.animateSlider(1)
	}

	showPreviousSlide = () => {
		this.state.prevGenre = this.state.curGenre
		this.state.curGenre =
			this.state.curGenre - this.state.slideCapacity < 0
				? this.state.curGenre -
					this.state.slideCapacity +
					this.state.genresCount
				: this.state.curGenre - this.state.slideCapacity
		this.animateSlider(-1)
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
			}, 20)

			setTimeout(() => {
				this.state.isAnimating = false
				this.nextBtn.disabled = false
				this.prevBtn.disabled = false
			}, 300)
		}, 300)
	}
}
