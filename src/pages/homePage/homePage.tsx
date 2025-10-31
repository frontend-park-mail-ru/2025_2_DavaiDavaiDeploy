import { CardGrid } from '@/components/cardGrig/cardGrid';
import { GenreSlider } from '@/components/genreSlider/genreSlider';
import { PromoFilm } from '@/components/promoFilm/promoFilm';
import { Component } from '@robocotik/react';
import styles from './homePage.module.scss';

export class HomePage extends Component {
	render() {
		return (
			<div className={styles.page}>
				<main className={styles.main}>
					<PromoFilm />
					<GenreSlider />
					<section className={styles.films}>
						<CardGrid />
					</section>
				</main>
			</div>
		);
	}
}
