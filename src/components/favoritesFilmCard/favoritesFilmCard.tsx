import Favorite from '@/assets/favorite.svg?react';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { withModal } from '@/modules/modals/withModal';
import type { WithModalProps } from '@/modules/modals/withModalProps';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import { Link } from '@/modules/router/link.tsx';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/favorites/actions';
import type { Map } from '@/types/map';
import type { ModelsFavFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import {
	Badge,
	Flex,
	Headline,
	IconButton,
	Image,
	Paragraph,
	Subhead,
	Title,
} from 'ddd-ui-kit';
import styles from './favoritesFilmCard.module.scss';

interface FavoritesFilmCardProps {
	film: ModelsFavFilm;
	deleteFromFavorites: (id: string) => {};
	addToFavorites: (id: string) => {};
}

interface FavoritesFilmCardState {
	inFav: boolean;
}

class FavoritesFilmCardComponent extends Component<
	FavoritesFilmCardProps & WithModalProps,
	FavoritesFilmCardState
> {
	state = {
		inFav: true,
	};

	handleChangeFavoriteStatus = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (this.state.inFav) {
			this.setState({ inFav: false });
			this.props.deleteFromFavorites(this.props.film.id);
			return;
		}

		this.setState({ inFav: true });
		this.props.addToFavorites(this.props.film.id);
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
						<Image
							className={styles.image}
							src={getImageURL(image)}
							alt={title}
						/>
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
						<Title
							className={styles.title}
							level="5"
							align="left"
							data-test-id="film-title"
						>
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
						onClick={this.handleChangeFavoriteStatus}
					>
						<Favorite
							className={clsx(styles.icon, {
								[styles.removed]: !this.state.inFav,
							})}
						/>
					</IconButton>
				</Flex>
			</Link>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	deleteFromFavorites: (id: string) =>
		dispatch(actions.deleteFromFavoritesAction(id)),
	addToFavorites: (id: string) => dispatch(actions.addToFavoritesAction(id)),
});

export const FavoritesFilmCard = compose(
	withRouter,
	withModal,
	connect(null, mapDispatchToProps),
)(FavoritesFilmCardComponent);
