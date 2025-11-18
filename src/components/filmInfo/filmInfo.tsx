import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatMoney } from '@/helpers/formatMoneyHelper/formatMoneyHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link';
import type { ModelsFilmPage } from '@/types/models';
import { Badge } from '@/uikit/badge/badge';
import { Flex } from '@/uikit/flex/flex';
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
				<Title className={styles.err} size="5xl" weight="bold" color="accent">
					Фильм не найден
				</Title>
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
			<Flex className={styles.film} direction="column">
				<div className={styles.container}>
					{posterSRC && (
						<img
							src={posterSRC}
							alt={title || 'Poster'}
							className={styles.image}
						/>
					)}
				</div>

				<Flex className={styles.content} direction="row" align="start">
					<Flex className={styles.media} align="start" justify="center">
						{coverSRC && (
							<img
								src={coverSRC}
								alt={title || 'Cover'}
								className={styles.cover}
							/>
						)}

						{formattedRating && ratingType && (
							<Badge
								mode={ratingType}
								className={styles[`rating-${ratingType}`]}
							>
								<Headline size="l">{formattedRating}</Headline>
							</Badge>
						)}
					</Flex>

					<Flex className={styles.info} direction="column" align="start">
						<Flex
							className={styles.firstRow}
							direction="row"
							align="start"
							justify="between"
						>
							<Flex className={styles.main} direction="column" align="start">
								{title && (
									<Title className={styles.title} size="5xl">
										{title}
									</Title>
								)}

								<Flex className={styles.subtitle} direction="row">
									{original_title && (
										<Subhead color="light" size="xs" opacity="80">
											{original_title}
										</Subhead>
									)}

									{age_category && (
										<Subhead color="light" size="xs" opacity="80">
											{age_category}
										</Subhead>
									)}
								</Flex>

								<Flex
									className={styles.smallAbout}
									align="center"
									justify="around"
								>
									{!!year && (
										<Subhead
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										>
											{year.toString()}
										</Subhead>
									)}
									{age_category && (
										<Subhead
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										>
											{age_category}
										</Subhead>
									)}
									{country && (
										<Subhead
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										>
											{country}
										</Subhead>
									)}
									{genre && (
										<Subhead
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										>
											{genre}
										</Subhead>
									)}
									{formattedDuration && (
										<Subhead
											className={styles.value}
											color="light"
											size="m"
											opacity="80"
										>
											{formattedDuration}
										</Subhead>
									)}
								</Flex>

								<Flex className={styles.smallRating}>
									<FilmRating film={this.props.film} />
								</Flex>

								{description && (
									<Paragraph className={styles.description} size="m">
										{description}
									</Paragraph>
								)}
							</Flex>

							<Flex className={styles.bigRating}>
								<FilmRating film={this.props.film} />
							</Flex>
						</Flex>

						<Flex
							className={styles.secondRow}
							align="start"
							direction="row"
							justify="between"
						>
							<div className={styles.about}>
								<Title className={styles.aboutTitle} size="3xl" weight="bold">
									О фильме
								</Title>

								<div className={styles.table}>
									{!!year && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Год производства
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{year.toString()}
											</Subhead>
										</>
									)}

									{country && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Страна
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{country}
											</Subhead>
										</>
									)}

									{genre && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Жанр
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{genre}
											</Subhead>
										</>
									)}

									{slogan && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Слоган
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{slogan}
											</Subhead>
										</>
									)}

									{formattedBudget && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Бюджет
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{formattedBudget}
											</Subhead>
										</>
									)}

									{formattedFees && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Сборы в мире
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{formattedFees}
											</Subhead>
										</>
									)}

									{formattedDuration && (
										<>
											<Headline className={styles.fact} size="l" weight="bold">
												Длительность
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												size="m"
												opacity="80"
											>
												{formattedDuration}
											</Subhead>
										</>
									)}
								</div>
							</div>

							{actors?.length > 0 && (
								<Flex className={styles.cast} align="end" direction="column">
									<Flex
										className={styles.castContent}
										direction="column"
										align="start"
									>
										<Title className={styles.roles} size="3xl" weight="bold">
											В главных ролях
										</Title>

										{actors.map((actor) => (
											<Link href={`/actors/${actor.id}`}>
												<Paragraph className={styles.actors} size="m">
													{actor.russian_name}
												</Paragraph>
											</Link>
										))}
									</Flex>
								</Flex>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		);
	}
}
