import { Component } from '@robocotik/react';
import styles from './footer.module.scss';

export class Footer extends Component {
	render() {
		return (
			<footer id="footer" className={styles.footer}>
				<p className={styles.content}>© Davai Film, 2025</p>
			</footer>
		);
	}
}
