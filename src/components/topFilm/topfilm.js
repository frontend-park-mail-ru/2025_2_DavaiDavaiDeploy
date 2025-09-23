import Component from '../core/baseComponent.js'

export default class TopFilm extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'topFilm')
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		this.addEventListeners()
	}
}
