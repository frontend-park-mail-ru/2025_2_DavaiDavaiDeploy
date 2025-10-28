import { Component } from '@robocotik/react';
import styles from './topFilm.module.scss';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/topFilm/actions';
import { selectTopFilm } from '@/redux/features/topFilm/selectors';
import type { Map } from '@/types/map';
import type { ModelsPromoFilm } from '@/types/models';

interface TopFilmProps {
	film: ModelsPromoFilm;
	getTopFilm: VoidFunction;
}

class TopFilmComponent extends Component<TopFilmProps> {
	onMount(): void {
		this.props.getTopFilm();
	}
	render() {
		if (!this.props.film.id) {
			return <div>Loading...</div>;
		}

		const { id, title, year, genre, duration, short_description, rating } =
			this.props.film;

		const formattedDuration = formatDuration(duration);
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const imageSrc = getImageSRC('topFilms', id, 'jpg');

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
					<img src={imageSrc} alt={title} className={styles.image} />
				</section>
			</a>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	film: selectTopFilm(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getTopFilm: () => dispatch(actions.getTopFilmAction()),
});

export const TopFilm = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TopFilmComponent);
