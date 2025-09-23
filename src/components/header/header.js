import Component from '../core/baseComponent.js'

export default class header extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'header')
	}

	render() {
		this.parent.insertAdjacentHTML('afterbegin', this.html())
		this.addEventListeners()
	}
}
