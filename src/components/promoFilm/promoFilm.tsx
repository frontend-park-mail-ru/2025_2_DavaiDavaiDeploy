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
import { Component } from '@robocotik/react';
import {
	Badge,
	Flex,
	Headline,
	Image,
	Paragraph,
	Subhead,
	Title,
} from 'ddd-ui-kit';
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

		return (
			<a aria-label="Card for promo film" className={styles.promoFilm}>
				<Flex className={styles.section}>
					<Flex className={styles.content} direction="column" justify="center">
						<Link href={`/films/${id}`} className={styles.linkWrap}>
							<Flex className={styles.header} align="center" direction="row">
								<Title className={styles.title} level="3">
									{title}
								</Title>
								{ratingType && (
									<Badge
										mode={ratingType}
										className={styles[`rating-${ratingType}`]}
									>
										<Headline level="7">{formattedRating}</Headline>
									</Badge>
								)}
							</Flex>
							<Flex className={styles.info} justify="between">
								<Subhead className={styles.item} level="10" color="light">
									{year?.toString()}
								</Subhead>
								<Subhead className={styles.item} level="10" color="light">
									{genre}
								</Subhead>
								{formattedDuration && (
									<Subhead className={styles.item} level="10" color="light">
										{formattedDuration}
									</Subhead>
								)}
							</Flex>

							<Title className={styles[`title-${ratingType}`]} level="2">
								{formattedRating}
							</Title>
							<Paragraph className={styles.description} level="8">
								{short_description}
							</Paragraph>
						</Link>
					</Flex>

					<Image
						src={getImageURL(image)}
						alt={title}
						className={styles.image}
					/>
				</Flex>
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
