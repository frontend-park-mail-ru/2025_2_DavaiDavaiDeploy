import Close from '@/assets/img/close.svg?react';
import Loupe from '@/assets/img/loupe.svg?react';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/search/actions.ts';
import type { Map } from '@/types/map';
import { Badge, Headline, Image } from '@/uikit';
import { Flex, IconButton } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { debounce } from '../../helpers/debounceHelper/debounceHelper';
import { formatRating } from '../../helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '../../helpers/ratingTypeHelper/ratingTypeHelper';
import type { State } from '../../modules/redux/types/store';
import { Link } from '../../modules/router/link';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { selectSearchResult } from '../../redux/features/search/selectors';
import type { ModelsSearchResponse } from '../../types/models';
import styles from './searchInput.module.scss';

const DEBOUNCE_DELAY = 150;
interface SearchInputProps {
	getSearchResult: (searchRequest: string) => void;
	getHintResult: (searchRequest: string) => void;
	onClose?: VoidFunction;
	type: 'small' | 'big';
	className: string;
	hintResult: ModelsSearchResponse;
}

interface SearchInputState {
	searchRequest: string;
}

class SearchInputComponent extends Component<
	SearchInputProps & WithRouterProps,
	SearchInputState
> {
	state = {
		searchRequest: '',
	};

	debouncedSearch = debounce((search) => {
		this.props.getHintResult(search);
	}, DEBOUNCE_DELAY);

	search = () => {
		if (this.state.searchRequest === '') {
			return;
		}

		this.props.getSearchResult(this.state.searchRequest);

		if (this.props.router.path !== '/search') {
			this.props.router.navigate('/search');
		}
	};

	handleSearchRequestChange = (event: InputEvent) => {
		const value = (event.target as HTMLInputElement).value;
		this.debouncedSearch(value);

		this.setState({ searchRequest: value });
	};

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			this.search();
		}
	};

	render() {
		if (this.props.type === 'big') {
			return (
				<div className={styles.bigSearchWrapper}>
					<Flex
						className={clsx(styles.searchInput, this.props.className, {
							[styles.active]: this.state.searchRequest !== '',
						})}
						direction="row"
						align="center"
					>
						<input
							type="text"
							placeholder="Поиск фильмов, актеров..."
							value={this.state.searchRequest}
							onInput={this.handleSearchRequestChange}
							className={styles.input}
							onKeyDown={this.handleKeyDown}
						></input>
						<IconButton
							mode="tertiary"
							className={styles.loupeBtn}
							onClick={this.props.onClose}
						>
							<Loupe className={styles.loupe} />
						</IconButton>
					</Flex>
					{this.state.searchRequest !== '' && (
						<div className={styles.hint}>
							<div className={styles.hintWrapper}>
								{(!this.props.hintResult.films ||
									!this.props.hintResult.actors) && <p>Нет результатов</p>}

								<div className={styles.hintContent}>
									<h1>Фильмы</h1>
									{this.props.hintResult.films &&
										this.props.hintResult.films.length > 0 && (
											<ul>
												{this.props.hintResult.films.map((film) => {
													const formattedRating = formatRating(film.rating);
													const ratingType = getRatingType(film.rating);
													return (
														<Link href={`/films/${film.id}`}>
															<li>
																<Image
																	className={styles.image}
																	src={film.cover}
																	alt={film.title}
																/>
																<div>
																	<div>
																		<h3>{film.title}</h3>
																		{ratingType && (
																			<Badge
																				mode={ratingType}
																				className={
																					styles[`rating-${ratingType}`]
																				}
																			>
																				<Headline level="7">
																					{formattedRating}
																				</Headline>
																			</Badge>
																		)}
																	</div>
																	<div>
																		<p>{film.genre}</p>
																		<p>{film.year}</p>
																	</div>
																</div>
															</li>
														</Link>
													);
												})}
											</ul>
										)}
								</div>
								<div className={styles.hintContent}>
									<h1>Актеры</h1>
									{this.props.hintResult.actors &&
										this.props.hintResult.actors.length > 0 && (
											<ul>
												{this.props.hintResult.actors.map((actor) => (
													<li key={actor.id}>
														<img src={actor.photo} alt={actor.russian_name} />
														<p>{actor.russian_name}</p>
													</li>
												))}
											</ul>
										)}
								</div>
							</div>
						</div>
					)}
				</div>
			);
		}

		return (
			<Flex
				className={clsx(styles.searchInput, {
					[styles.active]: this.state.searchRequest !== '',
				})}
				direction="row"
				align="center"
			>
				<IconButton
					mode="tertiary"
					className={styles.loupeBtn}
					onClick={this.search}
				>
					<Loupe className={styles.loupe} />
				</IconButton>
				<input
					type="text"
					placeholder="Поиск фильмов, актеров..."
					value={this.state.searchRequest}
					onInput={this.handleSearchRequestChange}
					className={styles.input}
					onKeyDown={this.handleKeyDown}
				></input>

				<IconButton
					mode="tertiary"
					className={styles.closeBtn}
					onClick={this.props.onClose}
				>
					<Close className={styles.close} />
				</IconButton>
			</Flex>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getSearchResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
	getHintResult: (searchRequest: string) =>
		dispatch(actions.getSearchResultAction(searchRequest)),
});

const mapStateToProps = (state: State): Map => ({
	hintResult: selectSearchResult(state),
});

export const SearchInput = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(SearchInputComponent);
