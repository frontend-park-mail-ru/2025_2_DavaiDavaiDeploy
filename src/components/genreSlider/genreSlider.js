import Component from '../core/baseComponent.js'

// function getGridColumnCount(element) {
// 	if (!element) return 0

// 	const style = window.getComputedStyle(element)

// 	if (style.display !== 'grid') {
// 		console.warn('Элемент не является grid контейнером')
// 		return 0
// 	}

// 	const columns = style.gridTemplateColumns
// 	if (!columns) return 0

// 	return columns.split(' ').filter(col => col.trim() !== '').length
// }

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
		this.updateSlider()
		this.AddEventListeners()
	}

	AddEventListeners() {
		this.nextBtn.addEventListener('click', this.showNextSlide)
		this.prevBtn.addEventListener('click', this.showPreviousSlide)
	}

	showNextSlide = () => {
		this.curSlide = (this.curSlide + 1) % this.slideСount
		this.updateSlider()
	}

	showPreviousSlide = () => {
		this.curSlide =
			this.curSlide - 1 < 0
				? this.slideСount + this.curSlide - 1
				: this.curSlide - 1
		this.updateSlider()
	}

	updateSlider = () => {
		let startIndex = this.curSlide * this.slideCapacity
		this.genres.forEach((genre, index) => {
			if (index < startIndex || startIndex + this.slideCapacity - 1 < index) {
				genre.style.display = 'none'
			} else {
				genre.style.display = 'block'
			}
		})
		// for (const [key, value] of Object.entries(params)) {...}
	}
}
