import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsTopFilm } from '@/modules/HTTPClient/types/api';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/topFilm/actions';
import { selectTopFilm } from '@/redux/features/topFilm/selectors';
import { Component } from '@react';
import styles from './TopFilm.module.scss';

class TopFilm extends Component<ModelsTopFilm & { getTopFilm: () => void }> {
	render() {
		if (!this.props.id) {
			this.props.getTopFilm();
			return <div>Loading...</div>;
		}
		console.log(this.props);

		const { image, title, year, genre, duration, short_description, rating } =
			this.props;
		const formattedDuration = formatDuration(duration);
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);

		return (
			<a className={styles.topFilm}>
				<section>
					<div className={styles.content}>
						<div className={styles.header}>
							<h1 className={styles.title}>{title}</h1>
							<div className={styles[`rating-${ratingType}`]}>
								<h3 className={styles.ratingTitle}>{formattedRating}</h3>
							</div>
						</div>
						<ul className={styles.info}>
							<li className={styles.item}>{year}</li>
							<li className={styles.item}>{genre}</li>
							<li className={styles.item}>{formattedDuration}</li>
						</ul>
						<h2 className={styles.description}>{short_description}</h2>
					</div>
					<img src={image} alt={title} className={styles.image} />
				</section>
			</a>
		);
	}
}

const mapStateToProps = (state: State) => ({
	...selectTopFilm(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getTopFilm: () => dispatch(actions.getTopFilmAction()),
});

export const ConnectedTopFilm = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TopFilm);
