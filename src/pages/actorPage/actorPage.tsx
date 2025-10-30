import { ActorInfo } from '@/components/actorInfo/actorInfo';
import { FilmSlider } from '@/components/filmSlider/filmSlider';
import { Component } from '@robocotik/react';
import styles from './actorPage.module.scss';

export class ActorPage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<main className={styles.main}>
					<ActorInfo />
					<FilmSlider />
				</main>
			</div>
		);
	}
}
