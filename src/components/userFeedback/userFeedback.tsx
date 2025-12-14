import Edit from '@/assets/edit.svg?react';
import { FeedBack } from '@/components/feedBack/feedBack.tsx';
import { FeedbackForm } from '@/components/feedbackForm/feedbackForm.tsx';
import { throttle } from '@/helpers/throttleHelper/throttleHelper';
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
import { Flex, IconButton, Title } from 'ddd-ui-kit';
import { getPathWithPath } from '../../helpers/getPathWithPath/getPathWithPath.ts';
import styles from './userFeedback.module.scss';

interface FeedbackFormProps {
	userFeedback: ModelsFilmFeedback | null;
	user: ModelsUser;
}

interface FeedbackFormState {
	isEditing: boolean;
	offsetTop: number | null;
}

const THROTTLE_DELAY: number = 10;
const MARGINE_TOP_SIZE = 100;

class FeedbackFormComponent extends Component<
	FeedbackFormProps & WithRouterProps,
	FeedbackFormState
> {
	state = {
		isEditing: false,
		offsetTop: null,
	};

	userFeedbackRef = createRef<HTMLDivElement>();

	onMount() {
		const throttledScrollHandler = throttle(this.handleScroll, THROTTLE_DELAY);
		window.addEventListener('scroll', throttledScrollHandler);
	}

	handleScroll = () => {
		const component = this.userFeedbackRef.current;

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
				<Flex className={styles.notAuth} direction="column" align="start">
					<Title
						className={styles.notAuthTitle}
						level="4"
						weight="bold"
						color="dark"
					>
						Хотите оставить отзыв?
					</Title>

					<span className={styles.notAuthText}>
						<Link
							href={getPathWithPath('login', this.props.router.path)}
							className={styles.notAuthLink}
						>
							Войдите
						</Link>{' '}
						или{' '}
						<Link
							href={getPathWithPath('register', this.props.router.path)}
							className={styles.notAuthLink}
						>
							создайте аккаунт
						</Link>
						!
					</span>
				</Flex>
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
				<Flex
					className={styles.feedbackContainer}
					direction="column"
					data-test-id="user-feedback"
				>
					<Flex className={styles.header} direction="row" align="center">
						<Title
							className={styles.title}
							level="4"
							weight="bold"
							color="dark"
						>
							Ваш отзыв
						</Title>
						<IconButton
							mode="quaternary"
							className={styles.editButton}
							onClick={this.handleEdit}
						>
							<Edit className={styles.edit} alt="Редактировать" />
						</IconButton>
					</Flex>
					<FeedBack feedback={userFeedback} />
				</Flex>
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
			<div ref={this.userFeedbackRef} className={styles.userFeedback}>
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
