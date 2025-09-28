import Component from '../core/baseComponent.js'

export default class Plaseholder extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'placeholder')
	}

	get self() {
		return this.parent.querySelector(`.placeholder`)
	}

	render() {
		const Styles = getComputedStyle(this.parent)
		const Width = this.parent.offsetWidth + 'px'
		const Height = this.parent.offsetHeight + 'px'
		this.parent.insertAdjacentHTML('beforeend', this.html())
		this.self.style.width = Width
		this.self.style.height = Height
		this.self.style.backgroundColor = 'transparent'
		this.self.style.display = 'block'
		this.self.style.borderRadius = Styles.borderRadius
	}
}
