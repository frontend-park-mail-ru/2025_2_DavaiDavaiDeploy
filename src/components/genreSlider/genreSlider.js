import Component from '../core/baseComponent.js'

function getGridColumnCount(element) {
	if (!element) {
		return 0
	}

	const style = window.getComputedStyle(element)
	const columns = style.gridTemplateColumns
	if (!columns) {
		return 0
	}

	return columns.split(' ').filter(col => col.trim() !== '').length
}

export default class GenreSlider extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'genreSlider')
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
		return Array.from(this.slider.querySelectorAll('img'))
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		this.curSlide = 0
		this.slideCapacity = 8
		this.slideСount = 3
		this.genresCount = this.genres.length
		this.curGenre = 0
		this.prevGenre = 0
		this.isAnimating = false
		this.resizeSlider()
		this.AddEventListeners()
	}

	AddEventListeners() {
		this.nextBtn.addEventListener('click', this.showNextSlide)
		this.prevBtn.addEventListener('click', this.showPreviousSlide)
		let timeout
		window.addEventListener('resize', () => {
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				this.resizeSlider()
			}, 0)
		})
	}

	showNextSlide = () => {
		this.prevGenre = this.curGenre
		this.curGenre = (this.curGenre + this.slideCapacity) % this.genresCount
		this.updateSlider(1)
	}

	showPreviousSlide = () => {
		this.prevGenre = this.curGenre
		this.curGenre =
			this.curGenre - this.slideCapacity < 0
				? this.curGenre - this.slideCapacity + this.genresCount
				: this.curGenre - this.slideCapacity
		this.updateSlider(-1)
	}

	resizeSlider = () => {
		let column = getGridColumnCount(this.slider)
		this.slideCapacity = column * 2
		this.updateSlider(0)
	}

	updateSliderr = () => {
		for (let i = 0; i < this.genresCount; i++) {
			this.genres[i].style.display = 'none'
		}

		for (let i = 0; i < this.slideCapacity; i++) {
			const idx = (this.curGenre + i) % this.genresCount
			this.genres[idx].style.display = 'block'
		}
	}

	updateSlider = direction => {
		if (this.isAnimating) {
			return
		}
		this.isAnimating = true
		this.nextBtn.disabled = true
		this.prevBtn.disabled = true

		this.genres.forEach((img, i) => {
			const wasVisible =
				i >= this.prevGenre && i < this.prevGenre + this.slideCapacity
			const isVisible =
				i >= this.curGenre && i < this.curGenre + this.slideCapacity

			if (wasVisible && !isVisible) {
				img.style.opacity = '0'
				img.style.transform = `translateX(${-direction * 100}%)`
			}
		})

		setTimeout(() => {
			this.genres.forEach((img, i) => {
				const isVisible =
					i >= this.curGenre && i < this.curGenre + this.slideCapacity
				img.style.display = isVisible ? 'block' : 'none'

				if (isVisible) {
					img.style.opacity = '0'
					img.style.transform = `translateX(${direction * 100}%)`
				}
			})

			setTimeout(() => {
				this.genres.forEach((img, i) => {
					const isVisible =
						i >= this.curGenre && i < this.curGenre + this.slideCapacity
					if (isVisible) {
						img.style.opacity = '1'
						img.style.transform = 'translateX(0)'
					}
				})
			}, 10)

			setTimeout(() => {
				this.isAnimating = false
				this.nextBtn.disabled = false
				this.prevBtn.disabled = false
			}, 900)
		}, 450)
	}
}
