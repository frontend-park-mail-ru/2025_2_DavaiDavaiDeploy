import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsFilm } from '@/types/models';
import { Component } from '@react';
import styles from './filmCard.module.scss';

interface FilmCardProps {
	film: ModelsFilm;
}

export class FilmCard extends Component<FilmCardProps> {
	render() {
		const { id, title, year, rating, genre } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const image = `https:\\cdn.ddfilms-static.ru/static/films/25df6602-f4bd-46ba-a210-54f9c45df241.png`;
		const info = `${genre}, ${year}`;
		return (
			<div className={styles.filmCard}>
				<div className={styles.imageContainer}>
					<Link href={`/film/${id}`}>
						<img className={styles.image} src={image} alt={title}></img>
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
