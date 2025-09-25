import { formatDuration } from '../../helpers/formatHelper.js'
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
		}
		this.parent.insertAdjacentHTML('afterbegin', this.html(context))
	}
}
