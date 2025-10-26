import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsFilm } from '@/types/models';
import { Component } from '@react';
import styles from './filmCard.module.scss';

interface FilmCardProps {
	film: ModelsFilm;
}

export class FilmCard extends Component<FilmCardProps> {
	render() {
		console.log('render card');
		console.log(this.props);
		const { id, title, year, rating, genre } = this.props.film;
		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const image = `https:\\cdn.ddfilms-static.ru/static/films/${id}.png`;
		const info = `${genre}, ${year}`;

		console.log(id);
		return (
			<div className={styles.filmCard} id="film-{{id}}">
				<div className={styles.imageContainer}>
					<a href="#">
						<img className={styles.image} src={image} alt={title}></img>
						<div className={styles[`rating-${ratingType}`]}>
							<h3>{{ formattedRating }}</h3>
						</div>
					</a>
				</div>
				<div className={styles.content}>
					<a href="#">
						<h2 className={styles.title}>{{ title }}</h2>
						<p className={styles.info}>{{ info }}</p>
					</a>
				</div>
			</div>
		);
	}
}
