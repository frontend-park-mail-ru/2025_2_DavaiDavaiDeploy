import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper.ts';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectUserRating } from '@/redux/features/film/selectors.ts';
import { selectUser } from '@/redux/features/user/selectors.ts';
import type { Map } from '@/types/map';
import type { ModelsUser } from '@/types/models.ts';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import { FilmRatingInput } from '../FilmRatingInput/FilmRatingInput.tsx';
import styles from './FeedbackForm.module.scss';

interface FeedbackFormProps {
	userRating: number | null;
	createFeedback: (
		rating: number,
		text: string,
		title: string,
		id: string,
	) => void;
	user: ModelsUser;
}

interface FeedbackFormState {
	title: string;
	text: string;
}

class FeedbackFormComponent extends Component<
	FeedbackFormProps & WithRouterProps,
	FeedbackFormState
> {
	state = {
		title: '',
		text: '',
	};

	handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		const { name, value } = target;
		this.setState({ [name]: value });
	};

	handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		const { title, text } = this.state;

		if (!title.trim() || !text.trim() || !this.props.userRating) {
			alert('Пожалуйста, заполните все поля');
			return;
		}

		this.props.createFeedback(
			this.props.userRating,
			text,
			title,
			this.props.router.params.id,
		);
	};

	render() {
		if (!this.props.user) {
			return <div></div>;
		}

		const { title, text } = this.state;
		const { login } = this.props.user;
		const imageSrc = getImageSRC('avatars', 'default', 'png');

		return (
			<div className={styles.feedbackForm}>
				<h2 className={styles.title}>Оставить отзыв</h2>
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
						className={styles.inputTitle}
						onInput={this.handleChange}
					/>
					<textarea
						name="text"
						value={text}
						placeholder="Текст"
						className={styles.textarea}
						onInput={this.handleChange}
					/>
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
