import { Component } from '@/modules/react';
import { Flex, Paragraph } from '@/uikit/index';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './footer.module.scss';

class FooterComponent extends Component<WithRouterProps> {
	render() {
		const type = this.props.router.path.startsWith('/films') ? 'light' : 'dark';
		return (
			<Flex
				id="footer"
				className={styles[`footer-${type}`]}
				justify="center"
				align="center"
			>
				<Paragraph className={styles.content} color="accent" level="8">
					© Davai Film, 2025
				</Paragraph>
			</Flex>
		);
	}
}

export const Footer = withRouter(FooterComponent);
