import { GenreCardGrid } from '@/components/cardGrig/cardGrid';
import { GenreInfo } from '@/components/genreInfo/genreInfo';
import { Component } from '@robocotik/react';
import styles from './genrePage.module.scss';

export class GenrePage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<GenreInfo />
				<section className={styles.films}>
					<GenreCardGrid />
				</section>
			</div>
		);
	}
}
