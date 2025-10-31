import { RouterContext } from '@/modules/router/routerContext';
import { Component } from '@robocotik/react';
import styles from './footer.module.scss';

export class Footer extends Component {
	static readonly contextType = RouterContext;

	render() {
		const type = this.context.path.startsWith('/film') ? 'light' : 'dark';
		return (
			<footer id="footer" className={styles[`footer-${type}`]}>
				<p className={styles.content}>© Davai Film, 2025</p>
			</footer>
		);
	}
}
