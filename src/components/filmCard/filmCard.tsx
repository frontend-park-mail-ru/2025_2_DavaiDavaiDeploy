import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Badge, Flex, Headline, Image, Subhead, Title } from 'ddd-ui-kit';
import styles from './filmCard.module.scss';

interface FilmCardProps {
	film: ModelsMainPageFilm;
	isDark?: boolean;
}

export class FilmCard extends Component<FilmCardProps> {
	render() {
		const { id, title, year, rating, genre, cover } = this.props.film;
		const { isDark } = this.props;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const info = `${genre}, ${year}`;
		return (
			<Flex className={styles.filmCard} direction="column">
				<div
					className={clsx(styles.imageContainer, { [styles.dark]: !!isDark })}
				>
					<Link href={`/films/${id}`}>
						<Image
							className={styles.image}
							src={getImageURL(cover)}
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
					</Link>
				</div>
				<Flex className={styles.content} direction="column" align="center">
					<Link href={`/films/${id}`}>
						<Title
							className={clsx(styles.title, { [styles.dark]: !!isDark })}
							weight="bold"
							level="6"
							align="center"
							data-test-id="search-film-title"
						>
							{title}
						</Title>
						<Subhead
							className={clsx(styles.info, { [styles.dark]: !!isDark })}
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
