import { FeedBack } from '@/components/feedBack/feedBack';
import { FilmInfo } from '@/components/filmInfo/filmInfo';
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
} from '@/redux/features/film/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmFeedback, ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './filmPage.module.scss';

interface FilmPageProps {
	film: ModelsFilmPage | null;
	filmError: string | null;
	feedbacks: ModelsFilmFeedback[] | null;
	feedbackError: string | null;
	getFilm: (id: string) => void;
	getFeedbacks: (limit: number, offset: number, id: string) => void;
	clearFilm: VoidFunction;
}

const FEEDBACKS_COUNT: number = 50;
const OFFSET: number = 0;

class FilmPageComponent extends Component<FilmPageProps & WithRouterProps> {
	onMount() {
		const filmId = this.props.router.params.id;
		this.props.getFilm(filmId);
		this.props.getFeedbacks(FEEDBACKS_COUNT, OFFSET, filmId);
	}

	onUnmount() {
		this.props.clearFilm();
	}

	render() {
		return (
			<div className={styles.page}>
				<FilmInfo film={this.props.film} error={this.props.filmError} />
				{this.props.film && (
					<section className={styles.content}>
						<div className={styles.left}>
							<h1 className={styles.feedback}>Отзывы</h1>
							<div className={styles.feedbacks}>
								{this.props.feedbacks && this.props.feedbacks.length > 0 ? (
									this.props.feedbacks.map((item, index) =>
										index === 0 && item.is_mine ? null : (
											<FeedBack feedback={item} />
										),
									)
								) : (
									<h1 className={styles.feedback}>Отзывов пока нет</h1>
								)}
							</div>
						</div>
						<div className={styles.right}>
							<Userfeedback />
						</div>
					</section>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	film: selectFilm(state),
	filmError: selectFilmError(state),
	feedbacks: selectFeedbacks(state),
	feedbackError: selectFeedbackError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilm: (id: string) => dispatch(actions.getFilmAction(id)),
	getFeedbacks: (limit: number, offset: number, id: string) =>
		dispatch(actions.getFeedbacksAction(limit, offset, id)),
	clearFilm: () => dispatch(actions.clearFilmAction()),
});

export const FilmPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmPageComponent);
