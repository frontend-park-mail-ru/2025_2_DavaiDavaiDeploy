import Star from '@/assets/Star.svg?react';
import clsx from '@/modules/clsx';
import { Component } from '@robocotik/react';
import { Flex } from '../Flex/Flex';
import { Headline } from '../Headline/Headline';
import styles from './Rating.module.scss';

interface RatingProps {
	rating: string;
	mode: 'low' | 'medium' | 'high';
	className?: string;
	getRootRef?: any;
	[key: string]: any;
}

export class Rating extends Component<RatingProps> {
	render() {
		const { rating, mode, getRootRef, className, ...rest } = this.props;

		return (
			<Flex
				className={clsx(styles.rating, className)}
				direction="row"
				align="center"
				getRootRef={getRootRef}
				{...rest}
			>
				<Star className={styles[`star-${mode}`]} />
				<Headline className={styles[`rating-${mode}`]} level="7">
					{rating}
				</Headline>
			</Flex>
		);
	}
}
