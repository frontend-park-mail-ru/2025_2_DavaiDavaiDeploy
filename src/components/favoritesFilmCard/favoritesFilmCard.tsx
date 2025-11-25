import Favorite from '@/assets/img/favorite.svg?react';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import { Link } from '@/modules/router/link.tsx';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/favorites/actions';
import type { Map } from '@/types/map';
import type { ModelsFavFilm } from '@/types/models';
import {
	Badge,
	Flex,
	Headline,
	IconButton,
	Image,
	Paragraph,
	Subhead,
	Title,
} from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './favoritesFilmCard.module.scss';

interface FavoritesFilmCardProps {
	film: ModelsFavFilm;
	deleteFromFavorites: (id: string) => {};
}

class FavoritesFilmCardComponent extends Component<FavoritesFilmCardProps> {
	handleDeletionFromFavorites = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		this.props.deleteFromFavorites(this.props.film.id);
	};

	render() {
		const {
			duration,
			genre,
			id,
			image,
			rating,
			short_description,
			title,
			year,
		} = this.props.film;

		const formattedRating = formatRating(rating);
		const formattedDuration = formatDuration(duration);
		const ratingType = getRatingType(rating);

		return (
			<Link href={`/films/${id}`} className={styles.linkWrap}>
				<Flex className={styles.filmCard} direction="row" align="center">
					<div className={styles.imageContainer}>
						<Image className={styles.image} src={image} alt={title} />
						{ratingType && (
							<Badge
								mode={ratingType}
								className={styles[`rating-${ratingType}`]}
							>
								<Headline level="7">{formattedRating}</Headline>
							</Badge>
						)}
					</div>
					<Flex className={styles.content} direction="column" align="start">
						<Title className={styles.title} level="5" align="left">
							{title}
						</Title>
						<Flex className={styles.info}>
							<Subhead
								className={styles.item}
								level="10"
								color="light"
								opacity="80"
							>
								{year.toString()}
							</Subhead>
							<Subhead
								className={styles.item}
								level="10"
								color="light"
								opacity="80"
							>
								{genre}
							</Subhead>
							{formattedDuration && (
								<Subhead
									className={styles.item}
									level="10"
									color="light"
									opacity="80"
								>
									{formattedDuration}
								</Subhead>
							)}
						</Flex>
						<Paragraph
							className={styles.description}
							color="base"
							level="8"
							align="left"
						>
							{short_description}
						</Paragraph>
					</Flex>
					<IconButton
						mode="secondary"
						className={styles.iconBtn}
						onClick={this.handleDeletionFromFavorites}
					>
						<Favorite className={styles.icon} />
					</IconButton>
				</Flex>
			</Link>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	deleteFromFavorites: (id: string) =>
		dispatch(actions.deleteFromFavoritesAction(id)),
});

export const FavoritesFilmCard = compose(
	withRouter,
	connect(null, mapDispatchToProps),
)(FavoritesFilmCardComponent);
