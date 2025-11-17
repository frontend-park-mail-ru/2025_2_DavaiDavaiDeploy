import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatMoney } from '@/helpers/formatMoneyHelper/formatMoneyHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link';
import type { ModelsFilmPage } from '@/types/models';
import { Headline } from '@/uikit/headline/headline';
import { Paragraph } from '@/uikit/paragraph/paragraph';
import { Subhead } from '@/uikit/subhead/subhead';
import { Title } from '@/uikit/title/title';
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
			return (
				<Title
					className={styles.err}
					text="Фильм не найден"
					size="5xl"
					weight="bold"
					color="accent"
				/>
			);
		}

		if (!this.props.film) {
			return <div className={styles.err}></div>;
		}

		const {
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
			cover,
			poster,
		} = this.props.film;

		const formattedRating = formatRating(rating);
		const ratingType = getRatingType(rating);
		const formattedDuration = formatDuration(duration);
		const coverSRC = getImageURL(cover);
		const posterSRC = getImageURL(poster);

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
								<Headline text={formattedRating} size="l" />
							</div>
						)}
					</div>

					<div className={styles.info}>
						<div className={styles.firstRow}>
							<div className={styles.main}>
								{title && (
									<Title className={styles.title} text={title} size="5xl" />
								)}
								<span className={styles.subtitle}>
									{original_title && (
										<Subhead
											text={original_title}
											color="light"
											size="xs"
											opacity="80"
										/>
									)}

									{age_category && (
										<Subhead
											text={age_category}
											color="light"
											size="xs"
											opacity="80"
										/>
									)}
								</span>

								<div className={styles.smallAbout}>
									{!!year && (
										<Subhead
											text={year}
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										/>
									)}
									{age_category && (
										<Subhead
											text={age_category}
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										/>
									)}
									{country && (
										<Subhead
											text={country}
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										/>
									)}
									{genre && (
										<Subhead
											text={genre}
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										/>
									)}
									{formattedDuration && (
										<Subhead
											text={formattedDuration}
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										/>
									)}
								</div>

								<div className={styles.smallRating}>
									<FilmRating film={this.props.film} />
								</div>

								{description && (
									<Paragraph
										text={description}
										className={styles.description}
										size="m"
									/>
								)}
							</div>

							<div className={styles.bigRating}>
								<FilmRating film={this.props.film} />
							</div>
						</div>

						<div className={styles.secondRow}>
							<div className={styles.about}>
								<Title
									className={styles.aboutTitle}
									text="О фильме"
									size="3xl"
									weight="bold"
								/>
								<div className={styles.table}>
									{!!year && (
										<>
											<Headline
												className={styles.fact}
												text="Год производства"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={year}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{country && (
										<>
											<Headline
												className={styles.fact}
												text="Страна"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={country}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{genre && (
										<>
											<Headline
												className={styles.fact}
												text="Жанр"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={genre}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{slogan && (
										<>
											<Headline
												className={styles.fact}
												text="Слоган"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={slogan}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{formattedBudget && (
										<>
											<Headline
												className={styles.fact}
												text="Бюджет"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={formattedBudget}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{formattedFees && (
										<>
											<Headline
												className={styles.fact}
												text="Сборы в мире"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={formattedFees}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}

									{formattedDuration && (
										<>
											<Headline
												className={styles.fact}
												text="Длительность"
												size="l"
												weight="bold"
											/>
											<Subhead
												text={formattedDuration}
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											/>
										</>
									)}
								</div>
							</div>

							{actors?.length > 0 && (
								<div className={styles.cast}>
									<div className={styles.castContent}>
										<Title
											className={styles.roles}
											text="В главных ролях"
											size="3xl"
											weight="bold"
										/>
										{actors.map((actor) => (
											<Link href={`/actors/${actor.id}`}>
												<Paragraph
													className={styles.actors}
													text={actor.russian_name}
													size="m"
												/>
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
