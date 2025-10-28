import { Component } from '@react';
import styles from './filmCard.module.scss';
import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsFilm } from '@/types/models';

interface FilmCardProps {
	film: ModelsFilm;
}

export class FilmCard extends Component<FilmCardProps> {
	render() {
		const { id, title, year, rating, genre } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const info = `${genre}, ${year}`;
		const imageSrc = getImageSRC('films', id, 'jpg');
		return (
			<div className={styles.filmCard}>
				<div className={styles.imageContainer}>
					<Link href={`/film/${id}`}>
						<img className={styles.image} src={imageSrc} alt={title}></img>
						<div className={styles[`rating-${ratingType}`]}>
							<h3>{formattedRating}</h3>
						</div>
					</Link>
				</div>
				<div className={styles.content}>
					<a href="#">
						<h2 className={styles.title}>{title}</h2>
						<p className={styles.info}>{info}</p>
					</a>
				</div>
			</div>
		);
	}
}
