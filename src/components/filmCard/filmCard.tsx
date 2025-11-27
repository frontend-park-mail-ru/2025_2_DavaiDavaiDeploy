import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsMainPageFilm } from '@/types/models';
import { Badge, Flex, Headline, Image, Subhead, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './filmCard.module.scss';

interface FilmCardProps {
	film: ModelsMainPageFilm;
}

export class FilmCard extends Component<FilmCardProps> {
	render() {
		const { id, title, year, rating, genre, cover } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const info = `${genre}, ${year}`;
		return (
			<Flex className={styles.filmCard} direction="column">
				<div className={styles.imageContainer}>
					<Link href={`/films/${id}`}>
						<Image className={styles.image} src={cover} alt={title} />
						{ratingType && (
							<Badge
								mode={ratingType}
								className={styles[`rating-${ratingType}`]}
							>
								<Headline level="7">{formattedRating}</Headline>
							</Badge>
						)}
					</Link>
				</div>
				<Flex className={styles.content} direction="column" align="center">
					<Link href={`/films/${id}`}>
						<Title
							className={styles.title}
							weight="bold"
							level="6"
							align="center"
						>
							{title}
						</Title>
						<Subhead
							className={styles.info}
							color="light"
							level="11"
							align="center"
						>
							{info}
						</Subhead>
					</Link>
				</Flex>
			</Flex>
		);
	}
}
