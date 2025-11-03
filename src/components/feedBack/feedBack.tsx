import Star from '@/assets/img/Star.svg';
import {
	formatDatetime,
	formatSmallDatetime,
} from '@/helpers/formatDateHelper/formatDateHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRatingForFeedback } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsFilmFeedback } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './feedBack.module.scss';

interface FeedBackProps {
	feedback: ModelsFilmFeedback;
}

export class FeedBack extends Component<FeedBackProps> {
	render() {
		const { rating, text, title, updated_at, user_login, user_avatar } =
			this.props.feedback;

		const formattedRating = formatRatingForFeedback(rating);
		const formattedDatetime = formatDatetime(updated_at);
		const smallDatetime = formatSmallDatetime(updated_at);
		const ratingType = getRatingType(rating);
		const imageSrc = getImageURL(user_avatar);

		return (
			<div className={styles[`feedback-${rating}`]}>
				<div className={styles.header}>
					<span className={styles.user}>
						<img src={imageSrc} className={styles.avatar}></img>
						<h3 className={styles.login}>{user_login}</h3>
					</span>
					<span className={styles.rating}>
						<img src={Star} className={styles.star} />
						<p className={styles[`rating-${ratingType}`]}>{formattedRating}</p>
					</span>
					<p className={styles.date}>{formattedDatetime}</p>
					<p className={styles.smallDate}>{smallDatetime}</p>
				</div>
				<hr className={styles.line}></hr>
				<div className={styles.content}>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.text}>{text}</p>
				</div>
			</div>
		);
	}
}
