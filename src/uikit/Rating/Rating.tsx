import Star from '@/assets/img/Star.svg?react';
import { Component } from '@/modules/react';
import { Flex } from '../Flex/Flex';
import { Headline } from '../Headline/Headline';
import styles from './Rating.module.scss';

interface RatingProps {
	rating: string;
	mode: 'low' | 'medium' | 'high';
	className?: string;
	getRootRef?: any;
}

export class Rating extends Component<RatingProps> {
	render() {
		const { rating, mode, getRootRef } = this.props;

		return (
			<Flex
				className={styles.rating}
				direction="row"
				align="center"
				getRootRef={getRootRef}
			>
				<Star className={styles[`star-${mode}`]} />
				<Headline className={styles[`rating-${mode}`]} level="7">
					{rating}
				</Headline>
			</Flex>
		);
	}
}
