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
		this.curGenre = (this.curGenre + this.slideCapacity) % this.genresCount
		this.updateSlider()
	}

	showPreviousSlide = () => {
		this.curGenre =
			this.curGenre - this.slideCapacity < 0
				? this.curGenre - this.slideCapacity + this.genresCount
				: this.curGenre - this.slideCapacity
		this.updateSlider()
	}

	resizeSlider = () => {
		let column = getGridColumnCount(this.slider)
		this.slideCapacity = column * 2
		this.updateSlider()
	}

	updateSlider = () => {
		for (let i = 0; i < this.genresCount; i++) {
			this.genres[i].style.display = 'none'
		}

		for (let i = 0; i < this.slideCapacity; i++) {
			const idx = (this.curGenre + i) % this.genresCount
			this.genres[idx].style.display = 'block'
		}
	}
}
