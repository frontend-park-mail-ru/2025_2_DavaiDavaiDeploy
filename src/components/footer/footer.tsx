import { Paragraph } from '@/uikit/paragraph/paragraph.tsx';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './footer.module.scss';

class FooterComponent extends Component<WithRouterProps> {
	render() {
		const type = this.props.router.path.startsWith('/films') ? 'light' : 'dark';
		return (
			<footer id="footer" className={styles[`footer-${type}`]}>
				<Paragraph className={styles.content} color="accent" size="m">
					© Davai Film, 2025
				</Paragraph>
			</footer>
		);
	}
}

export const Footer = withRouter(FooterComponent);
