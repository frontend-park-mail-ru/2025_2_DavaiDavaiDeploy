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
			return <Rutube className={styles.icon} />;
		}

		return <VkIcon className={styles.icon} />;
	};

	render() {
		const { url } = this.props;

		if (!url) {
			return <div />;
		}

		return (
			<a
				href={url}
				rel="noopener noreferrer"
				target="_blank"
				className={styles.link}
			>
				<Flex className={styles.whereToWatch} direction="row" align="center">
					<Title level="6" className={styles.title}>
						Смотрите на
					</Title>
					{this.renderIcon()}
				</Flex>
			</a>
		);
	}
}
