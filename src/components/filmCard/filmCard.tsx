import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsMainPageFilm } from '@/types/models';
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
		const imageSrc = getImageSRC(cover);
		return (
			<div className={styles.filmCard}>
				<div className={styles.imageContainer}>
					<Link href={`/films/${id}`}>
						<img className={styles.image} src={imageSrc} alt={title}></img>
						<div className={styles[`rating-${ratingType}`]}>
							<h3>{formattedRating}</h3>
						</div>
					</Link>
				</div>
				<div className={styles.content}>
					<Link href={`/films/${id}`}>
						<h2 className={styles.title}>{title}</h2>
						<p className={styles.info}>{info}</p>
					</Link>
				</div>
			</div>
		);
	}
}
