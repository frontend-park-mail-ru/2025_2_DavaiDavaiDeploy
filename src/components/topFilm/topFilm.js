import { formatDuration } from '../../helpers/formatHelper.js'
import { getRatingType } from '../../helpers/ratingTypeHelper.js'
import Component from '../core/baseComponent.js'

export default class TopFilm extends Component {
	constructor(parent, props = {}) {
		super(parent, props, 'topFilm')
	}

	get self() {
		return document.querySelector(`.top-film`)
	}

	render() {
		let context = {
			image: this.props.image,
			title: this.props.title,
			year: this.props.year,
			genre: this.props.genre,
			duration: formatDuration(this.props.duration),
			desription: this.props.desription,
			rating: this.props.rating.toFixed(1),
			ratingType: getRatingType(this.props.rating),
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))
	}
}
