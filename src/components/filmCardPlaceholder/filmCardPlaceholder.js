import Component from '../core/baseComponent.js'

export default class FilmCardPlaceholder extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'filmCardPlaceholder')
	}

	get self() {
		return this.parent.querySelector(`.placeholder`)
	}

	render() {
		const Width = this.parent.offsetWidth + 'px'
		const Height = this.parent.offsetHeight + 'px'
		this.parent.insertAdjacentHTML('beforeend', this.html())
		this.self.style.width = Width
		this.self.style.height = Height
	}
}
