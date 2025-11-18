import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatMoney } from '@/helpers/formatMoneyHelper/formatMoneyHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import { Link } from '@/modules/router/link';
import type { ModelsFilmPage } from '@/types/models';
import {
	Badge,
	Flex,
	Headline,
	Image,
	Paragraph,
	Subhead,
	Title,
} from '@/uikit/index';
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
				<Title className={styles.err} level="2" weight="bold" color="accent">
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

		const formattedBudget = formatMoney(budget);
		const formattedFees = formatMoney(worldwide_fees);

		return (
			<Flex className={styles.film} direction="column">
				<div className={styles.container}>
					<Image
						src={poster}
						alt={title || 'Poster'}
						className={styles.image}
					/>
				</div>

				<Flex className={styles.content} direction="row" align="start">
					<Flex className={styles.media} align="start" justify="center">
						<Image
							src={cover}
							alt={title || 'Cover'}
							className={styles.cover}
						/>

						{formattedRating && ratingType && (
							<Badge
								mode={ratingType}
								className={styles[`rating-${ratingType}`]}
							>
								<Headline level="7">{formattedRating}</Headline>
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
									<Title className={styles.title} level="2">
										{title}
									</Title>
								)}

								<Flex className={styles.subtitle} direction="row">
									{original_title && (
										<Subhead color="light" level="10" opacity="80">
											{original_title}
										</Subhead>
									)}

									{age_category && (
										<Subhead color="light" level="10" opacity="80">
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
											level="8"
											opacity="80"
										>
											{year.toString()}
										</Subhead>
									)}
									{age_category && (
										<Subhead
											className={styles.value}
											color="light"
											level="8"
											opacity="80"
										>
											{age_category}
										</Subhead>
									)}
									{country && (
										<Subhead
											className={styles.value}
											color="light"
											level="8"
											opacity="80"
										>
											{country}
										</Subhead>
									)}
									{genre && (
										<Subhead
											className={styles.value}
											color="light"
											level="8"
											opacity="80"
										>
											{genre}
										</Subhead>
									)}
									{formattedDuration && (
										<Subhead
											className={styles.value}
											color="light"
											level="8"
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
									<Paragraph className={styles.description} level="8">
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
								<Title className={styles.aboutTitle} level="4" weight="bold">
									О фильме
								</Title>

								<div className={styles.table}>
									{!!year && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Год производства
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{year.toString()}
											</Subhead>
										</>
									)}

									{country && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Страна
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{country}
											</Subhead>
										</>
									)}

									{genre && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Жанр
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{genre}
											</Subhead>
										</>
									)}

									{slogan && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Слоган
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{slogan}
											</Subhead>
										</>
									)}

									{formattedBudget && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Бюджет
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{formattedBudget}
											</Subhead>
										</>
									)}

									{formattedFees && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Сборы в мире
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
												opacity="80"
											>
												{formattedFees}
											</Subhead>
										</>
									)}

									{formattedDuration && (
										<>
											<Headline className={styles.fact} level="7" weight="bold">
												Длительность
											</Headline>
											<Subhead
												className={styles.value}
												color="light"
												level="8"
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
										<Title className={styles.roles} level="4" weight="bold">
											В главных ролях
										</Title>

										{actors.map((actor) => (
											<Link href={`/actors/${actor.id}`}>
												<Paragraph className={styles.actors} level="8">
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
