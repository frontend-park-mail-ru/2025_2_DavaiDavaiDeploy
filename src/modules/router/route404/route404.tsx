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
					<Title
						className={styles.title}
						text="404"
						weight="bold"
						color="accent"
					/>
					<div className={styles.content} class="err__content">
						<Paragraph
							className={styles.text}
							text="Похоже, вы забрели в тёмный космос"
							size="m"
						/>
						<Paragraph
							className={styles.text}
							text="Страница не найдена"
							size="m"
						/>

						<Link href="/">
							<Subhead
								className={styles.link}
								text="Вернуться на главную"
								color="accent"
							/>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
