import { Flex, Paragraph, Subhead, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { Link } from '../link';
import styles from './route404.module.scss';

export class Route404 extends Component {
	render() {
		return (
			<div className={styles.page}>
				<Flex
					className={styles.err}
					direction="row"
					align="center"
					justify="center"
				>
					<Title className={styles.title} weight="bold" color="accent">
						404
					</Title>

					<Flex className={styles.content} direction="column" align="start">
						<Paragraph className={styles.text} level="8">
							Похоже, вы забрели в тёмный космос
						</Paragraph>

						<Paragraph className={styles.text} level="8">
							Страница не найдена
						</Paragraph>

						<Link href="/">
							<Subhead className={styles.link} color="accent">
								Вернуться на главную
							</Subhead>
						</Link>
					</Flex>
				</Flex>
			</div>
		);
	}
}
