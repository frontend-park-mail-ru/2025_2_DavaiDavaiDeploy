import { TopFilm } from '@/components/topFilm/topFilm';
import { Component } from '@react';
import styles from './homePage.module.scss';

export class HomePage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<main className={styles.main}>
					<TopFilm />
					<section className={styles.films}></section>
				</main>
			</div>
		);
	}
}
