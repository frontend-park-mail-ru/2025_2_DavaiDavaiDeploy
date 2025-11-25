import { FeedBack } from '@/components/feedBack/feedBack';
import { FilmInfo } from '@/components/filmInfo/filmInfo';
import { Userfeedback } from '@/components/userFeedback/userFeedback';
import { throttle } from '@/helpers/throttleHelper/throttleHelper';
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
import { Flex, Title } from '@/uikit/index';
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

interface FilmPageState {
	offset: number;
	observer?: IntersectionObserver;
	throttledIntersectHandler?: VoidFunction;
}

const FEEDBACKS_COUNT: number = 3;
const THROTTLE_DELAY: number = 10;
const ROOT_MARGIN: string = '400px';
const INITIAL_RESIZE_DELAY = 300;

class FilmPageComponent extends Component<
	FilmPageProps & WithRouterProps,
	FilmPageState
> {
	state = {
		offset: 0,
		observer: undefined,
	};

	onMount() {
		const filmId = this.props.router.params.id;

		this.props.getFilm(filmId);
		this.loadMoreFeedbacks();

		const throttledIntersectHandler = throttle(
			this.loadMoreFeedbacks,
			THROTTLE_DELAY,
		);

		const observer = new IntersectionObserver(throttledIntersectHandler, {
			rootMargin: ROOT_MARGIN,
		});

		this.setState({ observer });

		setTimeout(() => {
			const trigger = document.querySelector(`.${styles.loadMoreTrigger}`);
			const observer = this.state.observer as IntersectionObserver | undefined;

			if (trigger && observer) {
				observer.observe(trigger);
			}
		}, INITIAL_RESIZE_DELAY);
	}

	onUnmount() {
		this.props.clearFilm();
		const observer = this.state.observer as IntersectionObserver | undefined;
		observer?.disconnect();
	}

	loadMoreFeedbacks = () => {
		if (this.props.feedbackError) {
			return;
		}

		this.props.getFeedbacks(
			FEEDBACKS_COUNT,
			this.state.offset,
			this.props.router.params.id,
		);

		this.setState({ offset: this.state.offset + FEEDBACKS_COUNT });
	};

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
							<div className={styles.loadMoreTrigger}></div>
						</Flex>
						<Flex className={styles.right} direction="column">
							<div class="wrapper">
								<Userfeedback />
							</div>
						</Flex>
					</Flex>
				)}
			</Flex>
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
