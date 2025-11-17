import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link';
import actions from '@/redux/features/promoFilm/actions';
import { selectPromoFilm } from '@/redux/features/promoFilm/selectors';
import type { Map } from '@/types/map';
import type { ModelsPromoFilm } from '@/types/models';
import { Title } from '@/uikit/title/title';
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
			return <div className={styles.promoFilm}></div>;
		}

		const {
			title,
			year,
			genre,
			duration,
			short_description,
			rating,
			image,
			id,
		} = this.props.film;

		const formattedDuration = formatDuration(duration);
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const imageSrc = getImageURL(image);

		return (
			<a aria-label="Card for promo film" className={styles.promoFilm}>
				<section>
					<div className={styles.content}>
						<Link href={`/films/${id}`} className={styles.linkWrap}>
							<div className={styles.header}>
								<Title className={styles.title} text={title} size="4xl" />

								<div className={styles[`rating-${ratingType}`]}>
									<h1 className={styles.ratingTitle}>{formattedRating}</h1>
								</div>
							</div>
							<ul className={styles.info}>
								<li className={styles.item}>{year}</li>
								<li className={styles.item}>{genre}</li>
								<li className={styles.item}>{formattedDuration}</li>
							</ul>

							<Title
								className={styles[`title-${ratingType}`]}
								text={formattedRating}
								size="5xl"
							/>

							<h2 className={styles.description}>{short_description}</h2>
						</Link>
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
