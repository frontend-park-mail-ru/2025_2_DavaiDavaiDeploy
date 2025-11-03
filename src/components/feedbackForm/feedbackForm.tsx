import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper.ts';
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
	};

	handleTitleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const { name, value } = target;

		const { message } = validateFeedbackTitle(value);

		this.setState({
			[name]: value,
			titleErrorMessage: message,
		});
	};

	handleTextChange = (event: Event) => {
		const target = event.target as HTMLTextAreaElement;
		const { name, value } = target;

		let textErrorMessage = '';

		if (value.trim().length >= 5) {
			const validation = validateFeedbackText(value);
			textErrorMessage = validation.message;
		}

		this.setState({
			[name]: value,
			textErrorMessage,
		});
	};

	handleSubmit = () => {
		const { title, text } = this.state;

		const { message: titleErrorMessage } = validateFeedbackTitle(title);
		const { message: textErrorMessage } = validateFeedbackText(text);

		this.setState({ titleErrorMessage, textErrorMessage });

		if (titleErrorMessage || textErrorMessage || !this.props.userRating) {
			return;
		}

		this.props.createFeedback(
			this.props.userRating,
			text,
			title,
			this.props.router.params.id,
		);

		this.props.closeEditing();
	};

	render() {
		const { title, text } = this.state;
		const { login, avatar } = this.props.user;
		const imageSrc = getImageSRC(avatar);

		return (
			<div className={styles.feedbackForm}>
				{!this.props.isEditing && (
					<h2 className={styles.title}>Оставить отзыв</h2>
				)}
				{this.props.isEditing && (
					<h2 className={styles.title}>Редактирование</h2>
				)}
				<div className={styles.header}>
					<span className={styles.user}>
						<img src={imageSrc} className={styles.avatar}></img>
						<h3 className={styles.login}>{login}</h3>
					</span>
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
					<p className={styles.errorMessage}>{this.state.titleErrorMessage}</p>
					<textarea
						name="text"
						value={text}
						placeholder="Текст"
						className={clsx(styles.textarea, {
							[styles.errorBorder]: this.state.textErrorMessage.length > 0,
						})}
						onInput={this.handleTextChange}
					/>
					<p className={styles.errorMessage}>{this.state.textErrorMessage}</p>
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
