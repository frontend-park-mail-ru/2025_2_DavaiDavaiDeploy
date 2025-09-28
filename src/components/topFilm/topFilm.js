import { formatDuration } from '../../helpers/durationFormatHelper/durationFormatHelper.js'
import { formatRating } from '../../helpers/ratingFormatHelper/ratingFormatHelper.js'
import { getRatingType } from '../../helpers/ratingTypeHelper/ratingTypeHelper.js'
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
			rating: formatRating(this.props.rating),
			ratingType: getRatingType(this.props.rating),
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))
	}
}
