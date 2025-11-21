import Favorite from '@/assets/img/favorite.svg?react';
import { formatDateForCalendar } from '@/helpers/formatDateForCalendarHelper/formatDateForCalendarHelper';
import clsx from '@/modules/clsx';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsFilmInCalendar } from '@/types/models';
import {
	Flex,
	Headline,
	IconButton,
	Image,
	Subhead,
	Title,
} from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './calendarWidgetFilmCard.module.scss';

interface CalendarWidgetFilmCardProps {
	film: ModelsFilmInCalendar;
	number: number;
}

export class CalendarWidgetFilmCard extends Component<CalendarWidgetFilmCardProps> {
	render() {
		const { id, title, cover, is_liked, original_title, release_date } =
			this.props.film;

		const { day, month } = formatDateForCalendar(release_date);
		const { number } = this.props;

		return (
			<Link href={`/films/${id}`} className={styles.linkWrap}>
				<Flex className={styles.filmCard} direction="row" align="center">
					<Flex className={styles.left} direction="row" align="center">
						<Headline level="7">{number.toString()}</Headline>
						<div className={styles.imageContainer}>
							<Image className={styles.image} src={cover} alt={title} />
						</div>
						<Flex className={styles.content} direction="column" align="start">
							<Headline
								className={styles.title}
								weight="bold"
								level="9"
								align="center"
							>
								{title}
							</Headline>
							<Subhead
								className={styles.subtitle}
								color="light"
								level="11"
								align="center"
							>
								{original_title}
							</Subhead>
						</Flex>
					</Flex>
					<Flex className={styles.right} direction="row" align="center">
						<Flex className={styles.date} direction="column" align="center">
							<Title
								className={clsx(styles.day, `styles.day${number}`)}
								level="4"
							>
								{day}
							</Title>
							<Subhead className={styles.month} level="11" color="base">
								{month}
							</Subhead>
						</Flex>
						<IconButton
							mode="secondary"
							className={clsx(styles.iconBtn, {
								[styles.inFav]: is_liked,
								[styles.notInFav]: !is_liked,
							})}
						>
							<Favorite className={styles.icon} />
						</IconButton>
					</Flex>
				</Flex>
			</Link>
		);
	}
}
