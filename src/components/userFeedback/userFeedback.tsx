import Edit from '@/assets/img/edit.svg';
import { FeedBack } from '@/components/feedBack/feedBack.tsx';
import { FeedbackForm } from '@/components/feedbackForm/feedbackForm.tsx';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import { selectUserFeedback } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmFeedback, ModelsUser } from '@/types/models.ts';
import { Component, createRef } from '@robocotik/react';
import styles from './userFeedback.module.scss';

interface FeedbackFormProps {
	userFeedback: ModelsFilmFeedback | null;
	user: ModelsUser;
}

interface FeedbackFormState {
	isEditing: boolean;
}

const MARGIN_TOP_SIZE = 100;

class FeedbackFormComponent extends Component<
	FeedbackFormProps & WithRouterProps,
	FeedbackFormState
> {
	state = {
		isEditing: false,
	};

	wrapperRef = createRef<HTMLDivElement>();
	contentRef = createRef<HTMLDivElement>();
	observer: IntersectionObserver | null = null;

	onMount() {
		requestAnimationFrame(() => {
			this.initObserver();
		});
	}

	onUnmount() {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
	}

	initObserver = () => {
		const wrapper = this.wrapperRef.current;

		if (!wrapper) {
			return;
		}

		const options: IntersectionObserverInit = {
			root: null,
			rootMargin: `-${MARGIN_TOP_SIZE}px 0px 0px 0px`,
			threshold: 0,
		};

		const callback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				const content = this.contentRef.current;

				if (!content) {
					return;
				}

				if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
					content.classList.add(styles.fixed);
				} else {
					content.classList.remove(styles.fixed);
				}
			});
		};

		this.observer = new IntersectionObserver(callback, options);
		this.observer.observe(wrapper);
	};

	handleEdit = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	renderContent = () => {
		if (!this.props.user) {
			return (
				<div ref={this.contentRef} className={styles.notAuth}>
					<p className={styles.notAuthTitle}>Хотите оставить отзыв?</p>

					<span className={styles.notAuthText}>
						<Link href="/login" className={styles.notAuthLink}>
							Войдите
						</Link>{' '}
						или{' '}
						<Link href="/register" className={styles.notAuthLink}>
							создайте аккаунт
						</Link>
						!
					</span>
				</div>
			);
		}

		const { userFeedback } = this.props;
		const { isEditing } = this.state;

		if (isEditing) {
			return (
				<FeedbackForm
					isEditing={true}
					userFeedback={this.props.userFeedback}
					closeEditing={this.handleEdit}
				/>
			);
		} else if (userFeedback) {
			return (
				<div className={styles.feedbackContainer}>
					<div className={styles.header}>
						<h1 className={styles.title}>Ваш отзыв</h1>
						<button className={styles.editButton} onClick={this.handleEdit}>
							<img src={Edit} className={styles.edit} alt="Редактировать" />
						</button>
					</div>
					<FeedBack feedback={userFeedback} />
				</div>
			);
		}

		return (
			<FeedbackForm
				isEditing={false}
				userFeedback={null}
				closeEditing={this.handleEdit}
			/>
		);
	};

	render() {
		return (
			<div ref={this.wrapperRef} className={styles.userFeedback}>
				{this.renderContent()}
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userFeedback: selectUserFeedback(state),
	user: selectUser(state),
});

export const Userfeedback = compose(
	withRouter,
	connect(mapStateToProps),
)(FeedbackFormComponent);
