import Edit from '@/assets/img/edit.svg';
import { throttle } from '@/helpers/throttleHelper/throttleHelper';
import { compose, connect } from '@/modules/redux';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link.tsx';
import { selectUserFeedback } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmFeedback, ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FeedBack } from '../feedBack/feedBack.tsx';
import { FeedbackForm } from '../feedbackForm/feedbackForm.tsx';
import styles from './userFeedback.module.scss';

interface FeedbackFormProps {
	userFeedback: ModelsFilmFeedback | null;
	user: ModelsUser;
}

interface FeedbackFormState {
	isEditing: boolean;
	offsetTop: number | null;
}

const INITIAL_SCROLL_DELAY = 300;
const THROTTLE_DELAY: number = 10;
const MARGINE_TOP_SIZE = 112;

class FeedbackFormComponent extends Component<
	FeedbackFormProps & WithRouterProps,
	FeedbackFormState
> {
	state = {
		isEditing: false,
		offsetTop: null,
	};

	onMount() {
		const throttledScrollHandler = throttle(this.handleScroll, THROTTLE_DELAY);

		setTimeout(() => {
			window.addEventListener('scroll', throttledScrollHandler);
		}, INITIAL_SCROLL_DELAY);
	}

	handleScroll = () => {
		const component = document.querySelector(
			`.${styles.userFeedback}`,
		) as HTMLElement;

		if (!component) {
			return;
		}

		const offsetTop = component.offsetTop;

		if (this.state.offsetTop === null) {
			this.setState({ offsetTop });
		}

		if (
			window.scrollY >=
			Math.max(offsetTop, this.state.offsetTop ?? 0) - MARGINE_TOP_SIZE
		) {
			component?.classList.add(styles.fixed);
		} else {
			component?.classList.remove(styles.fixed);
		}
	};

	handleEdit = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	renderContent = () => {
		if (!this.props.user) {
			return (
				<div className={styles.notAuth}>
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
		return <div className={styles.userFeedback}>{this.renderContent()}</div>;
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
