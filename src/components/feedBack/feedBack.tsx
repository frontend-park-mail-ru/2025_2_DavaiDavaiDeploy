import {
	formatDatetime,
	formatSmallDatetime,
} from '@/helpers/formatDateHelper/formatDateHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRatingForFeedback } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsFilmFeedback } from '@/types/models';
import { Avatar } from '@/uikit/avatar/avatar';
import { Headline } from '@/uikit/headline/headline';
import { Paragraph } from '@/uikit/paragraph/paragraph';
import { Rating } from '@/uikit/rating/rating';
import { Separator } from '@/uikit/separator/separator';
import { Subhead } from '@/uikit/subhead/subhead';
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
						<Avatar size="m" src={imageSrc} className={styles.avatar} />
						<Subhead
							text={user_login}
							className={styles.login}
							color="dark"
							opacity="80"
							size="l"
						/>
					</span>
					{formattedRating && ratingType && (
						<Rating rating={formattedRating} mode={ratingType} />
					)}
					{formattedDatetime && (
						<Subhead
							text={formattedDatetime}
							className={styles.date}
							color="dark"
							size="s"
							opacity="50"
						/>
					)}

					{smallDatetime && (
						<Subhead
							text={smallDatetime}
							className={styles.smallDate}
							color="dark"
							size="s"
							opacity="50"
						/>
					)}
				</div>
				<Separator mode="secondary" className={styles.line} />
				<div className={styles.content}>
					<Headline
						text={title}
						className={styles.title}
						color="dark"
						size="l"
						weight="bold"
					/>

					<Paragraph
						text={text}
						className={styles.text}
						color="dark"
						size="m"
					/>
				</div>
			</div>
		);
	}
}
