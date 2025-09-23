import Component from '../core/baseComponent.js'

export default class FilmCard extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'filmCard')
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
	}
}
