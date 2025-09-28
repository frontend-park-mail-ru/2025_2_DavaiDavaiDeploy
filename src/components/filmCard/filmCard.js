import { getRatingType } from '../../helpers/ratingTypeHelper.js'
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
			title: this.props.title,
			info: this.props.info,
			rating: this.props.rating.toFixed(1),
			ratingType: getRatingType(this.props.rating),
		}

		this.parent.insertAdjacentHTML('beforeend', this.html(context))
	}

	rerender() {
		let context = {
			id: this.props.id,
			image: this.props.image,
			title: this.props.title,
			info: this.props.info,
			rating: this.props.rating.toFixed(1),
			ratingType: getRatingType(this.props.rating),
		}
		this.self.outerHTML = this.html(context)
	}
}
