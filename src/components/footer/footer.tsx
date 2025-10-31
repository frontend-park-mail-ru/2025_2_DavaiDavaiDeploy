import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './footer.module.scss';

class FooterComponent extends Component<WithRouterProps> {
	render() {
		const type = this.props.router.path.startsWith('/film') ? 'light' : 'dark';
		return (
			<footer id="footer" className={styles[`footer-${type}`]}>
				<p className={styles.content}>© Davai Film, 2025</p>
			</footer>
		);
	}
}

export const Footer = withRouter(FooterComponent);
