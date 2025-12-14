import {
	formatDatetime,
	formatSmallDatetime,
} from '@/helpers/formatDateHelper/formatDateHelper';
import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { formatRatingForFeedback } from '@/helpers/ratingFormatHelper/ratingFormatHelper';
import { getRatingType } from '@/helpers/ratingTypeHelper/ratingTypeHelper';
import type { ModelsFilmFeedback } from '@/types/models';
import { Component } from '@robocotik/react';
import {
	Avatar,
	Flex,
	Headline,
	Paragraph,
	Rating,
	Separator,
	Subhead,
} from 'ddd-ui-kit';
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

		return (
			<Flex className={styles[`feedback-${rating}`]} direction="column">
				<Flex
					className={styles.header}
					align="center"
					direction="row"
					justify="between"
				>
					<Flex
						className={styles.user}
						align="center"
						direction="row"
						justify="between"
					>
						<Avatar
							level="8"
							src={getImageURL(user_avatar)}
							className={styles.avatar}
						/>
						<Subhead
							className={styles.login}
							color="dark"
							opacity="80"
							level="7"
						>
							{user_login}
						</Subhead>
					</Flex>
					{formattedRating && ratingType && (
						<Rating
							rating={formattedRating}
							mode={ratingType}
							data-test-id="film-feedback-rating"
						/>
					)}
					{formattedDatetime && (
						<Subhead
							className={styles.date}
							color="dark"
							level="9"
							opacity="50"
						>
							{formattedDatetime}
						</Subhead>
					)}
					{smallDatetime && (
						<Subhead
							className={styles.smallDate}
							color="dark"
							level="9"
							opacity="50"
						>
							{smallDatetime}
						</Subhead>
					)}
				</Flex>
				<Separator mode="secondary" className={styles.line} />
				<Flex className={styles.content} direction="column">
					<Headline
						className={styles.title}
						color="dark"
						level="7"
						weight="bold"
						data-test-id="feedback-title"
					>
						{title}
					</Headline>
					<Paragraph
						className={styles.text}
						data-test-id="feedback-text"
						color="dark"
						level="8"
					>
						{text}
					</Paragraph>
				</Flex>
			</Flex>
		);
	}
}
