import Favorite from '@/assets/img/favorite.svg?react';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
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
}

export class FavoritesFilmCard extends Component<FavoritesFilmCardProps> {
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
			<Link href={`/films/${id}`}>
				<Flex className={styles.filmCard} direction="row">
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
							weight="bold"
							level="6"
							align="left"
						>
							{title}
						</Title>
						<Flex className={styles.info}>
							<Subhead className={styles.item} level="10" color="light">
								{year.toString()}
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
						<Paragraph
							className={styles.description}
							color="base"
							level="8"
							align="left"
						>
							{short_description}
						</Paragraph>
					</Flex>
					<IconButton mode="secondary" className={styles.iconBtn}>
						<Favorite className={styles.icon} />
					</IconButton>
				</Flex>
			</Link>
		);
	}
}
