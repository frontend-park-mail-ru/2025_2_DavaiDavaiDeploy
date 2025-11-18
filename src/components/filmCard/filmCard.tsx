import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsMainPageFilm } from '@/types/models';
import { Badge } from '@/uikit/badge/badge';
import { Flex } from '@/uikit/flex/flex';
import { Headline } from '@/uikit/headline/headline';
import { Subhead } from '@/uikit/subhead/subhead';
import { Title } from '@/uikit/title/title';
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
		const imageSrc = getImageURL(cover);
		return (
			<Flex className={styles.filmCard} direction="column">
				<div className={styles.imageContainer}>
					<Link href={`/films/${id}`}>
						<img className={styles.image} src={imageSrc} alt={title} />
						{ratingType && (
							<Badge
								mode={ratingType}
								className={styles[`rating-${ratingType}`]}
							>
								<Headline size="l">{formattedRating}</Headline>
							</Badge>
						)}
					</Link>
				</div>
				<Flex className={styles.content} direction="column" align="center">
					<Link href={`/films/${id}`}>
						<Title
							className={styles.title}
							weight="bold"
							size="xl"
							align="center"
						>
							{title}
						</Title>
						<Subhead
							className={styles.info}
							color="light"
							size="2xs"
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
