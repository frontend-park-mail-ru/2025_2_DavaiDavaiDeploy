import { Component } from '@robocotik/react';
import { FilmRating } from '../filmRating/filmRating';
import styles from './film.module.scss';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsFilmPage } from '@/types/models';

interface FilmProps {
	film: ModelsFilmPage;
}

export class Film extends Component<FilmProps> {
	render() {
		if (Object.keys(this.props.film).length === 0) {
			return <div>Loading...</div>;
		}

		const {
			id,
			title,
			genre,
			rating,
			description,
			age_category,
			budget,
			worldwide_fees,
			year,
			country,
			slogan,
			duration,
			actors,
			original_title,
		} = this.props.film;

		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const formattedDuration = formatDuration(duration);
		const coverSRC = getImageSRC('films', id, 'jpg');
		const posterSRC = getImageSRC(
			'topFilms',
			'2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
			'jpg',
		);

		return (
			<div className={styles.film}>
				<div className={styles.container}>
					<img src={posterSRC} alt={title} className={styles.image} />
				</div>

				<div className={styles.content}>
					<div className={styles.media}>
						<img src={coverSRC} alt={title} className={styles.cover} />
						<div className={styles[`rating-${ratingType}`]}>
							<h3>{formattedRating}</h3>
						</div>
					</div>

					<div className={styles.info}>
						<div className={styles.firstRow}>
							<div className={styles.main}>
								<h1 className={styles.title}>{title}</h1>
								<span className={styles.subtitle}>
									{original_title && <h3>{original_title}</h3>}
									<h3>{age_category}</h3>
								</span>

								<div className={styles.smallAbout}>
									<p className={styles.value}>{year}</p>
									<p className={styles.value}>{age_category}</p>
									<p className={styles.value}>{country}</p>
									<p className={styles.value}>{genre}</p>
									<p className={styles.value}>{formattedDuration}</p>
								</div>

								<p className={styles.description}>{description}</p>
							</div>

							<FilmRating film={this.props.film} />
						</div>

						<div className={styles.secondRow}>
							<div className={styles.about}>
								<h1 className={styles.aboutTitle}>О фильме</h1>
								<div className={styles.table}>
									<p className={styles.fact}>Год производства</p>
									<p className={styles.value}>{year}</p>
									<p className={styles.fact}>Страна</p>
									<p className={styles.value}>{country}</p>
									<p className={styles.fact}>Жанр</p>
									<p className={styles.value}>{genre}</p>
									{slogan && <p className={styles.fact}>Слоган</p>}
									{slogan && <p className={styles.value}>{slogan}</p>}
									<p className={styles.fact}>Бюджет</p>
									<p className={styles.value}>{budget}</p>
									<p className={styles.fact}>Сборы в мире</p>
									<p className={styles.value}>{worldwide_fees}</p>
									<p className={styles.fact}>Длительность</p>
									<p className={styles.value}>{formattedDuration}</p>
								</div>
							</div>

							<div className={styles.cast}>
								<div className={styles.castContent}>
									<h1 className={styles.roles}>В главных ролях</h1>
									{actors.map((actor) => {
										return (
											<Link href="#">
												<p className={styles.actors}>{actor.russian_name}</p>
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
