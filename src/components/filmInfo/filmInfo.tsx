import Favorite from '@/assets/img/favorite.svg?react';
import { formatDuration } from '@/helpers/durationFormatHelper/durationFormatHelper';
import { formatMoney } from '@/helpers/formatMoneyHelper/formatMoneyHelper';
import { formatRating } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import clsx from '@/modules/clsx';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import { Link } from '@/modules/router/link';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/film/actions';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import {
	Badge,
	Button,
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
	deleteFromFavorites: (id: string) => {};
	addToFavorites: (id: string) => {};
	isAuthentificated: boolean;
}

class FilmInfoComponent extends Component<FilmInfoProps & WithRouterProps> {
	handleFavorites = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		const { film } = this.props;

		if (!film) {
			return;
		}

		if (!this.props.isAuthentificated) {
			this.props.router.navigate('/login');
		}

		if (film.is_liked) {
			this.props.deleteFromFavorites(film.id);
			return;
		}

		this.props.addToFavorites(film.id);
	};

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
			genre_id,
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
			is_liked,
			is_out,
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
					<Flex
						className={styles.right}
						align="center"
						justify="center"
						direction="column"
					>
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
						<Button
							mode="secondary"
							className={clsx(styles.favBtn, {
								[styles.inFav]: is_liked,
								[styles.notInFav]: !is_liked,
							})}
							onClick={this.handleFavorites}
						>
							<Favorite className={styles.favIcon} />
							<Headline level="7">Избранное</Headline>
						</Button>
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
										<Link href={`/genres/${genre_id}`}>
											<Subhead
												className={clsx(styles.value, styles.genre)}
												color="light"
												level="8"
												opacity="80"
											>
												{genre}
											</Subhead>
										</Link>
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

								<Flex
									className={styles.smallRating}
									direction="column"
									align="center"
								>
									{is_out && <FilmRating film={this.props.film} />}
									<Button
										mode="secondary"
										className={clsx(styles.smallFavBtn, {
											[styles.inFav]: is_liked,
											[styles.notInFav]: !is_liked,
										})}
										onClick={this.handleFavorites}
									>
										<Favorite className={styles.favIcon} />
										<Headline level="7">Избранное</Headline>
									</Button>
								</Flex>

								{description && (
									<Paragraph className={styles.description} level="8">
										{description}
									</Paragraph>
								)}
							</Flex>

							<Flex className={styles.bigRating}>
								{is_out && <FilmRating film={this.props.film} />}
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
											<Link href={`/genres/${genre_id}`}>
												<Subhead
													className={clsx(styles.genre, styles.value)}
													color="light"
													level="8"
													opacity="80"
												>
													{genre}
												</Subhead>
											</Link>
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

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	deleteFromFavorites: (id: string) =>
		dispatch(actions.deleteFromFavoritesAction(id)),
	addToFavorites: (id: string) => dispatch(actions.addToFavoritesAction(id)),
});

export const FilmInfo = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmInfoComponent);
