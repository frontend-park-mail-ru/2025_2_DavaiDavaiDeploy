import { validateFeedbackText } from '@/helpers/validateFeedbackText/validateFeedbackText.ts';
import { validateFeedbackTitle } from '@/helpers/validateFeedbackTitle/validateFeedbackTitle.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmFeedback, ModelsUser } from '@/types/models.ts';
import { Button, Flex, FormItem, Textarea, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmRatingInput } from '../filmRatingInput/filmRatingInput.tsx';
import { AppToast } from '../toastContainer/toastContainer.tsx';
import styles from './feedbackForm.module.scss';

interface FeedbackFormProps {
	userRating: number | null;
	createFeedback: (
		rating: number,
		text: string,
		title: string,
		id: string,
	) => void;
	user: ModelsUser;
	isEditing: boolean;
	closeEditing: VoidFunction;
	userFeedback: ModelsFilmFeedback | null;
}

interface FeedbackFormState {
	title: string;
	text: string;
	titleErrorMessage: string;
	textErrorMessage: string;
	errorShown: boolean;
}

class FeedbackFormComponent extends Component<
	FeedbackFormProps & WithRouterProps,
	FeedbackFormState
> {
	state = {
		title: this.props.userFeedback?.title ? this.props.userFeedback.title : '',
		text: this.props.userFeedback?.text ? this.props.userFeedback.text : '',
		titleErrorMessage: '',
		textErrorMessage: '',
		errorShown: false,
	};

	handleTitleChange = (value: string) => {
		let titleErrorMessage = '';

		if (this.state.titleErrorMessage) {
			const validation = validateFeedbackTitle(value);
			titleErrorMessage = validation.message;
		}

		this.setState({
			title: value,
			titleErrorMessage,
		});
	};

	handleTextChange = (value: string) => {
		let textErrorMessage = '';

		if (this.state.textErrorMessage !== '') {
			const validation = validateFeedbackText(value);
			textErrorMessage = validation.message;
		}

		this.setState({
			text: value,
			textErrorMessage,
		});
	};

	handleSubmit = () => {
		const { title, text } = this.state;

		const { message: titleErrorMessage } = validateFeedbackTitle(title);
		const { message: textErrorMessage } = validateFeedbackText(text);

		this.setState({
			titleErrorMessage,
			textErrorMessage,
		});

		if (!this.props.userRating) {
			AppToast.error('Оцените фильм');
		}

		if (titleErrorMessage || textErrorMessage || !this.props.userRating) {
			return;
		}

		this.setState({ errorShown: false });

		this.props.createFeedback(
			this.props.userRating,
			text,
			title,
			this.props.router.params.id,
		);

		if (this.props.isEditing) {
			this.props.closeEditing();
		}
	};

	render() {
		const { title, text } = this.state;

		return (
			<Flex
				className={styles.feedbackForm}
				direction="column"
				align="center"
				justify="center"
			>
				{!this.props.isEditing && (
					<Title className={styles.title} level="4" weight="bold" color="blue">
						Оставить отзыв
					</Title>
				)}
				{this.props.isEditing && (
					<Title className={styles.title} level="4" weight="bold" color="blue">
						Редактирование
					</Title>
				)}
				<Flex className={styles.header} align="center" direction="column">
					<FilmRatingInput isDark={true} />
				</Flex>

				<Flex className={styles.input} direction="column">
					<FormItem
						mode="tertiary"
						value={title}
						placeholder="Заголовок"
						className={styles.inputTitle}
						onChange={this.handleTitleChange}
						status={this.state.titleErrorMessage ? 'error' : 'default'}
						bottom={
							this.state.titleErrorMessage
								? this.state.titleErrorMessage
								: 'Придумайте короткий заголовок'
						}
					/>

					<Textarea
						value={text}
						placeholder="Текст"
						className={styles.textarea}
						onChange={this.handleTextChange}
						status={this.state.textErrorMessage ? 'error' : 'default'}
						bottom={
							this.state.textErrorMessage
								? this.state.textErrorMessage
								: 'Расскажите, что вы думаете о фильме - от 30 символов'
						}
					/>
				</Flex>

				<Button
					mode="quaternary"
					className={styles.submitButton}
					onClick={this.handleSubmit}
					borderRadius="l"
					size="l"
				>
					Опубликовать
				</Button>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	userRating: selectUserRating(state),
	user: selectUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	createFeedback: (rating: number, text: string, title: string, id: string) =>
		dispatch(actions.createFeedbackAction(rating, text, title, id)),
});

export const FeedbackForm = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FeedbackFormComponent);
