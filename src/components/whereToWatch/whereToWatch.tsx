import Rutube from '@/assets/rutube.svg?react';
import VkIcon from '@/assets/vk.svg?react';
import { Component } from '@robocotik/react';
import { Flex, Title } from 'ddd-ui-kit';
import styles from './whereToWatch.module.scss';

interface WhereToWatchProps {
	url?: string;
}

export class WhereToWatch extends Component<WhereToWatchProps> {
	renderIcon = () => {
		const { url } = this.props;

		if (url?.includes('rutube')) {
			return (
				<a href={url} className={styles.link}>
					<VkIcon className={styles.icon} />{' '}
				</a>
			);
		}

		return (
			<a href={url} className={styles.link}>
				<Rutube className={styles.icon} />
			</a>
		);
	};

	render() {
		const { url } = this.props;

		if (!url) {
			return <div />;
		}

		return (
			<Flex className={styles.whereToWatch} direction="row" align="center">
				<Title level="6" className={styles.title}>
					Где посмотреть
				</Title>
				{this.renderIcon()}
			</Flex>
		);
	}
}
