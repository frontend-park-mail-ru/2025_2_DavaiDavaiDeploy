import { Component } from '@robocotik/react';
import { Link } from '../link';
import styles from './route404.module.scss';

export class Route404 extends Component {
	render() {
		return (
			<div className={styles.page}>
				<div className={styles.err}>
					<h1 className={styles.title}>404</h1>
					<div className={styles.content} class="err__content">
						<p className={styles.text}>Похоже, вы забрели в тёмный космос</p>
						<p className={styles.text}>Страница не найдена</p>
						<Link href="/">
							<p className={styles.link}>Вернуться на главную</p>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
