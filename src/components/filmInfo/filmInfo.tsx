import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatMoney } from '@/helpers/formatMoneyHelper/formatMoneyHelper';
import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link.tsx';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import { FilmRating } from '../filmRating/filmRating';
import styles from './filmInfo.module.scss';

interface FilmInfoProps {
	film: ModelsFilmPage | null;
	error: string | null;
}

export class FilmInfo extends Component<FilmInfoProps> {
	render() {
		if (this.props.error) {
			return <div className={styles.err}>Фильм не найден</div>;
		}

		if (!this.props.film) {
			return <div className={styles.err}>Загрузка фильма</div>;
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
			'promoFilms',
			'2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
			'jpg',
		);

		const formattedBudget = formatMoney(budget);
		const formattedFees = formatMoney(worldwide_fees);

		return (
			<div className={styles.film}>
				<div className={styles.container}>
					{posterSRC && (
						<img
							src={posterSRC}
							alt={title || 'Poster'}
							className={styles.image}
						/>
					)}
				</div>

				<div className={styles.content}>
					<div className={styles.media}>
						{coverSRC && (
							<img
								src={coverSRC}
								alt={title || 'Cover'}
								className={styles.cover}
							/>
						)}
						{formattedRating && (
							<div className={styles[`rating-${ratingType}`]}>
								<h3>{formattedRating}</h3>
							</div>
						)}
					</div>

					<div className={styles.info}>
						<div className={styles.firstRow}>
							<div className={styles.main}>
								{title && <h1 className={styles.title}>{title}</h1>}
								<span className={styles.subtitle}>
									{original_title && <h3>{original_title}</h3>}
									{age_category && <h3>{age_category}</h3>}
								</span>

								<div className={styles.smallAbout}>
									{!!year && <p className={styles.value}>{year}</p>}
									{age_category && (
										<p className={styles.value}>{age_category}</p>
									)}
									{country && <p className={styles.value}>{country}</p>}
									{genre && <p className={styles.value}>{genre}</p>}
									{formattedDuration && (
										<p className={styles.value}>{formattedDuration}</p>
									)}
								</div>

								<div className={styles.smallRating}>
									<FilmRating film={this.props.film} />
								</div>

								{description && (
									<p className={styles.description}>{description}</p>
								)}
							</div>

							<div className={styles.bigRating}>
								<FilmRating film={this.props.film} />
							</div>
						</div>

						<div className={styles.secondRow}>
							<div className={styles.about}>
								<h1 className={styles.aboutTitle}>О фильме</h1>
								<div className={styles.table}>
									{!!year && (
										<>
											<p className={styles.fact}>Год производства</p>
											<p className={styles.value}>{year}</p>
										</>
									)}

									{country && (
										<>
											<p className={styles.fact}>Страна</p>
											<p className={styles.value}>{country}</p>
										</>
									)}

									{genre && (
										<>
											<p className={styles.fact}>Жанр</p>
											<p className={styles.value}>{genre}</p>
										</>
									)}

									{slogan && (
										<>
											<p className={styles.fact}>Слоган</p>
											<p className={styles.value}>{slogan}</p>
										</>
									)}

									{formattedBudget && (
										<>
											<p className={styles.fact}>Бюджет</p>
											<p className={styles.value}>{formattedBudget}</p>
										</>
									)}

									{formattedFees && (
										<>
											<p className={styles.fact}>Сборы в мире</p>
											<p className={styles.value}>{formattedFees}</p>
										</>
									)}

									{formattedDuration && (
										<>
											<p className={styles.fact}>Длительность</p>
											<p className={styles.value}>{formattedDuration}</p>
										</>
									)}
								</div>
							</div>

							{actors?.length > 0 && (
								<div className={styles.cast}>
									<div className={styles.castContent}>
										<h1 className={styles.roles}>В главных ролях</h1>
										{actors.map((actor) => (
											<Link href={`/actors/${actor.id}`}>
												<p className={styles.actors}>{actor.russian_name}</p>
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
