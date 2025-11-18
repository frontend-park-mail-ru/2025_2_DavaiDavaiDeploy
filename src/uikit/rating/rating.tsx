import Star from '@/assets/img/Star.svg?react';
import { Component } from '@robocotik/react';
import { Headline } from '../headline/headline';
import styles from './rating.module.scss';

interface RatingProps {
	rating: string;
	mode: 'low' | 'medium' | 'high';
	className?: string;
}

export class Rating extends Component<RatingProps> {
	render() {
		const { rating, mode } = this.props;

		return (
			<span className={styles.rating}>
				<Star className={styles[`star-${mode}`]} />
				<Headline className={styles[`rating-${mode}`]} size="l">
					{rating}
				</Headline>
			</span>
		);
	}
}
