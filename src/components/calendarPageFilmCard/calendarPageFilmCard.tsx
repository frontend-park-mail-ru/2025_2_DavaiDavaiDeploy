import Favorite from '@/assets/favorite.svg?react';
import { formatDateForCalendar } from '@/helpers/formatDateForCalendarHelper/formatDateForCalendarHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { getPathWithPath } from '@/helpers/getPathWithPath/getPathWithPath';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/calendar/actions';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmInCalendar } from '@/types/models';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import {
	Button,
	Flex,
	Image,
	Paragraph,
	Spacing,
	Subhead,
	Title,
} from 'ddd-ui-kit';
import styles from './calendarPageFilmCard.module.scss';

interface CalendarPageFilmCardProps {
	film: ModelsFilmInCalendar;
	number: number;
	deleteFromFavorites: (id: string) => {};
	addToFavorites: (id: string) => {};
	isAuthentificated: boolean;
}

class CalendarPageFilmCardComponent extends Component<
	CalendarPageFilmCardProps & WithRouterProps
> {
	handleFavorites = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (!this.props.isAuthentificated) {
			this.props.router.navigate(
				getPathWithPath('login', this.props.router.path),
			);
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
			cover,
			is_liked,
			original_title,
			release_date,
			short_description,
		} = this.props.film;

		const { day, month } = formatDateForCalendar(release_date);
		const { number } = this.props;

		return (
			<Link href={`/films/${id}`} className={styles.linkWrap}>
				<Flex
					className={styles.filmCard}
					direction="row"
					align="center"
					justify="between"
				>
					<Flex className={styles.left} direction="row" align="center">
						<Title level="4" className={styles.number}>
							{number.toString()}
						</Title>
						<div className={styles.imageContainer}>
							<Image
								className={styles.image}
								src={getImageURL(cover)}
								alt={title}
							/>
						</div>
						<Flex className={styles.content} direction="column" align="start">
							<Flex
								direction="row"
								align="center"
								className={styles.firstRow}
								justify="between"
							>
								<Title
									className={styles.title}
									weight="regular"
									level="5"
									align="left"
								>
									{title}
								</Title>
							</Flex>
							<Flex className={styles.info}>
								<Subhead className={styles.item} level="10" color="light">
									{original_title}
								</Subhead>
							</Flex>
							<Spacing level="9" className={styles.spacing} />
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
						<Flex className={styles.date} direction="column" align="center">
							<Title className={styles.day} level="2">
								{day}
							</Title>
							<Subhead className={styles.month} level="8" color="base">
								{month}
							</Subhead>
						</Flex>
						<Button
							mode="secondary"
							className={clsx(styles.favBtn, {
								[styles.inFav]: is_liked,
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

export const CalendarPageFilmCard = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CalendarPageFilmCardComponent);
