import { FeedBack } from '@/components/feedBack/feedBack';
import { FilmInfo } from '@/components/filmInfo/filmInfo';
import { FilmsLine } from '@/components/filmsLine/filmsLine';
import { Userfeedback } from '@/components/userFeedback/userFeedback';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/film/actions';
import {
	selectFeedbackError,
	selectFeedbacks,
	selectFilm,
	selectFilmError,
	selectFilmFeedbacksLoading,
	selectFilmLoading,
	selectSimilarFilms,
	selectSimilarFilmsLoading,
} from '@/redux/features/film/selectors';
import type { Map } from '@/types/map';
import type {
	ModelsFilmFeedback,
	ModelsFilmPage,
	ModelsMainPageFilm,
} from '@/types/models';
import { Component } from '@robocotik/react';
import clsx from 'ddd-clsx';
import { Flex, Title } from 'ddd-ui-kit';
import styles from './filmPage.module.scss';

interface FilmPageProps {
	film: ModelsFilmPage | null;
	filmError: string | null;
	feedbacks: ModelsFilmFeedback[] | null;
	feedbackError: string | null;
	getFilm: (id: string) => void;
	getFeedbacks: (limit: number, offset: number, id: string) => void;
	clearFilm: VoidFunction;
	filmLoading: boolean;
	filmFeedbacksLoading: boolean;
	getSimilarFilms: (id: string) => void;
	similarFilmsLoading: boolean;
	similarFilms: ModelsMainPageFilm[] | null;
}

const FEEDBACKS_COUNT: number = 100;

class FilmPageComponent extends Component<FilmPageProps & WithRouterProps> {
	onMount() {
		const filmId = this.props.router.params.id;
		this.props.getFilm(filmId);
		this.props.getSimilarFilms(filmId);
	}

	onUpdate() {
		if (
			this.props.film?.is_out &&
			!this.props.feedbacks &&
			!this.props.filmFeedbacksLoading &&
			!this.props.feedbackError
		) {
			this.props.getFeedbacks(FEEDBACKS_COUNT, 0, this.props.router.params.id);
		}

		if (
			this.props.film &&
			this.props.film.id !== this.props.router.params.id &&
			!this.props.filmLoading &&
			!this.props.filmFeedbacksLoading &&
			!this.props.similarFilmsLoading &&
			!this.props.feedbackError &&
			!this.props.filmError
		) {
			this.props.clearFilm();
			const filmId = this.props.router.params.id;
			this.props.getFilm(filmId);
			this.props.getFeedbacks(FEEDBACKS_COUNT, 0, filmId);
			this.props.getSimilarFilms(filmId);
		}
	}

	onUnmount() {
		this.props.clearFilm();
	}

	renderFeedbacks() {
		const { feedbacks } = this.props;

		if (feedbacks && feedbacks.length > 0) {
			return feedbacks.map((item, index) =>
				index === 0 && item.is_mine ? null : <FeedBack feedback={item} />,
			);
		} else {
			return (
				<Title className={styles.feedback} level="4" weight="bold">
					Отзывов пока нет
				</Title>
			);
		}
	}

	render() {
		return (
			<Flex className={styles.page} direction="column">
				<FilmInfo film={this.props.film} error={this.props.filmError} />
				<Flex
					className={clsx(styles.lowePart, {
						[styles.dark]: !this.props.film?.is_out,
					})}
					direction="column"
				>
					<FilmsLine
						films={this.props.similarFilms}
						title="Если вам понравился этот фильм"
						isDark={this.props.film?.is_out}
					/>
					{this.props.film && this.props.film.is_out && (
						<Flex
							className={styles.content}
							direction="row"
							align="start"
							justify="between"
						>
							<Flex className={styles.left} direction="column">
								<Flex className={styles.feedbacks} direction="column">
									{this.renderFeedbacks()}
								</Flex>
							</Flex>
							<Flex className={styles.right} direction="column">
								<div class="wrapper">
									<Userfeedback />
								</div>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	film: selectFilm(state),
	filmError: selectFilmError(state),
	feedbacks: selectFeedbacks(state),
	feedbackError: selectFeedbackError(state),
	filmLoading: selectFilmLoading(state),
	filmFeedbacksLoading: selectFilmFeedbacksLoading(state),
	similarFilmsLoading: selectSimilarFilmsLoading(state),
	similarFilms: selectSimilarFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilm: (id: string) => dispatch(actions.getFilmAction(id)),
	getFeedbacks: (limit: number, offset: number, id: string) =>
		dispatch(actions.getFeedbacksAction(limit, offset, id)),
	clearFilm: () => dispatch(actions.clearFilmAction()),
	getSimilarFilms: (id: string) => dispatch(actions.getSimilarFilmsAction(id)),
});

export const FilmPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmPageComponent);
