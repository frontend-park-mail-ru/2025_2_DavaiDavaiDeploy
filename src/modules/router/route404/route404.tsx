import { Paragraph } from '@/uikit/paragraph/paragraph';
import { Subhead } from '@/uikit/subhead/subhead';
import { Title } from '@/uikit/title/title';
import { Component } from '@robocotik/react';
import { Link } from '../link';
import styles from './route404.module.scss';

export class Route404 extends Component {
	render() {
		return (
			<div className={styles.page}>
				<div className={styles.err}>
					<Title className={styles.title} weight="bold" color="accent">
						404
					</Title>

					<div className={styles.content}>
						<Paragraph className={styles.text} size="m">
							Похоже, вы забрели в тёмный космос
						</Paragraph>

						<Paragraph className={styles.text} size="m">
							Страница не найдена
						</Paragraph>

						<Link href="/">
							<Subhead className={styles.link} color="accent">
								Вернуться на главную
							</Subhead>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
