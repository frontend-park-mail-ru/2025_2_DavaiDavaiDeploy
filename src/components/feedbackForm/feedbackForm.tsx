import { validateFeedbackText } from '@/helpers/validateFeedbackText/validateFeedbackText.ts';
import { validateFeedbackTitle } from '@/helpers/validateFeedbackTitle/validateFeedbackTitle.ts';
import clsx from '@/modules/clsx/index.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsFilmFeedback, ModelsUser } from '@/types/models.ts';
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

	handleTitleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { value } = target;
		let titleErrorMessage = '';

		if (this.state.titleErrorMessage) {
			const validation = validateFeedbackTitle(value);
			titleErrorMessage = validation.message;
		}

		this.setState({
			title: value,
			titleErrorMessage: titleErrorMessage,
		});
	};

	handleTextChange = (event: Event) => {
		const target = event.target as HTMLTextAreaElement;
		const { value } = target;
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
			<div className={styles.feedbackForm}>
				{!this.props.isEditing && (
					<h2 className={styles.title}>Оставить отзыв</h2>
				)}
				{this.props.isEditing && (
					<h2 className={styles.title}>Редактирование</h2>
				)}
				<div className={styles.header}>
					<FilmRatingInput isDark={true} />
				</div>

				<div className={styles.input}>
					<input
						type="text"
						name="title"
						value={title}
						placeholder="Заголовок"
						className={clsx(styles.inputTitle, {
							[styles.errorBorder]: this.state.titleErrorMessage.length > 0,
						})}
						onInput={this.handleTitleChange}
					/>

					{this.state.titleErrorMessage ? (
						<p className={styles.errorMessage}>
							{this.state.titleErrorMessage}
						</p>
					) : (
						<p className={styles.defaultMessage}>
							Придумайте короткий заголовок
						</p>
					)}

					<textarea
						name="text"
						placeholder="Текст"
						className={clsx(styles.textarea, {
							[styles.errorBorder]: this.state.textErrorMessage.length > 0,
						})}
						onInput={this.handleTextChange}
					>
						{text}
					</textarea>

					{this.state.textErrorMessage ? (
						<p className={styles.errorMessage}>{this.state.textErrorMessage}</p>
					) : (
						<p className={styles.defaultMessage}>
							Расскажите, что вы думаете о фильме - от 30 символов
						</p>
					)}
				</div>

				<button className={styles.submitButton} onClick={this.handleSubmit}>
					Опубликовать
				</button>
			</div>
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
