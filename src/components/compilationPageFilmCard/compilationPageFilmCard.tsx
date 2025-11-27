import Favorite from '@/assets/img/favorite.svg?react';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import clsx from '@/modules/clsx';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/calendar/actions';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsCompFilm } from '@/types/models';
import {
	Badge,
	Button,
	Flex,
	Headline,
	Image,
	Paragraph,
	Subhead,
	Title,
} from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './compilationPageFilmCard.module.scss';

interface CompilationPageFilmCardProps {
	film: ModelsCompFilm;
	deleteFromFavorites: (id: string) => {};
	addToFavorites: (id: string) => {};
	isAuthentificated: boolean;
}

class CompilationPageFilmCardComponent extends Component<
	CompilationPageFilmCardProps & WithRouterProps
> {
	handleFavorites = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (!this.props.isAuthentificated) {
			this.props.router.navigate('/login');
		}

		if (this.props.film.is_liked) {
			this.props.deleteFromFavorites(this.props.film.id);
			return;
		}

		this.props.addToFavorites(this.props.film.id);
	};

	render() {
		const {
			id,
			title,
			short_description,
			duration,
			genre,
			image,
			rating,
			year,
			is_liked,
		} = this.props.film;

		const formattedRating = formatRating(rating);
		const formattedDuration = formatDuration(duration);
		const ratingType = getRatingType(rating);

		return (
			<Link href={`/films/${id}`} className={styles.linkWrap}>
				<Flex
					className={styles.filmCard}
					direction="row"
					align="center"
					justify="between"
				>
					<Flex className={styles.left} direction="row" align="center">
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
							<Title
								className={styles.title}
								weight="regular"
								level="5"
								align="left"
							>
								{title}
							</Title>
							<Flex className={styles.info} direction="row">
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
					</Flex>
					<Flex className={styles.right} direction="column" align="center">
						<Button
							mode="secondary"
							className={clsx(styles.favBtn, {
								[styles.inFav]: !!is_liked,
								[styles.notInFav]: !is_liked,
							})}
							onClick={this.handleFavorites}
						>
							<Favorite className={styles.favIcon} />
							<Subhead level="7" color="base">
								Избранное
							</Subhead>
						</Button>
					</Flex>
				</Flex>
			</Link>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	deleteFromFavorites: (id: string) =>
		dispatch(actions.deleteFromFavoritesAction(id)),
	addToFavorites: (id: string) => dispatch(actions.addToFavoritesAction(id)),
});

export const CompilationPageFilmCard = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CompilationPageFilmCardComponent);
