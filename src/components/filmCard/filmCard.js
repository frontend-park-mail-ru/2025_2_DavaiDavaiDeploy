import Component from '../core/baseComponent.js'

export default class FilmCard extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'filmCard')
	}

	get self() {
		return document.querySelector(`#film-${this.props.id}`)
	}

	render() {
		let context = {
			id: this.props.id,
			image: this.props.image,
			href: '#',
			title: this.props.title,
			info: this.props.info,
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))
	}
}
