import { Component } from '@robocotik/react';
import { Flex, Title } from 'ddd-ui-kit';
import styles from './whereToWatch.module.scss';

interface WhereToWatchProps {
	url?: string;
}

export class WhereToWatch extends Component<WhereToWatchProps> {
	render() {
		const { url } = this.props;

		if (!url) {
			return <div />;
		}

		return (
			<Flex className={styles.whereToWatch} direction="row">
				<Title level="6">Где посмотреть</Title>
			</Flex>
		);
	}
}
