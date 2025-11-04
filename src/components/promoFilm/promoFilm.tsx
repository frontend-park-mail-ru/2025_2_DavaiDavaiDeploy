import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/promoFilm/actions';
import { selectPromoFilm } from '@/redux/features/promoFilm/selectors';
import type { Map } from '@/types/map';
import type { ModelsPromoFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './promoFilm.module.scss';

interface PromoFilmProps {
	film: ModelsPromoFilm | null;
	getPromoFilm: VoidFunction;
}

class PromoFilmComponent extends Component<PromoFilmProps> {
	onMount() {
		this.props.getPromoFilm();
	}
	render() {
		if (!this.props.film) {
			return <div>Loading...</div>;
		}

		const { title, year, genre, duration, short_description, rating, image } =
			this.props.film;

		const formattedDuration = formatDuration(duration);
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const imageSrc = getImageURL(image);

		return (
			<a className={styles.promoFilm}>
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
	film: selectPromoFilm(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getPromoFilm: () => dispatch(actions.getPromoFilmAction()),
});

export const PromoFilm = connect(
	mapStateToProps,
	mapDispatchToProps,
)(PromoFilmComponent);
