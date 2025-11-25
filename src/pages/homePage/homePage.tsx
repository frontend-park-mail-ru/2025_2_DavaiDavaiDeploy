import { CalendarWidget } from '@/components/calendarWidget/calendarWidget';
import { CompilationWidget } from '@/components/compilationWidget/compilationWidget';
import { FilmCardGrid } from '@/components/filmCardGrid/filmCardGrid';
import { GenreSlider } from '@/components/genreSlider/genreSlider';
import { PromoFilm } from '@/components/promoFilm/promoFilm';
import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './homePage.module.scss';

export class HomePage extends Component {
	render() {
		return (
			<Flex className={styles.page} direction="column">
				<Flex className={styles.main} direction="column">
					<PromoFilm />
					<GenreSlider />
					<CompilationWidget />
					<CalendarWidget />
					<Flex className={styles.films} direction="column">
						<FilmCardGrid />
					</Flex>
				</Flex>
			</Flex>
		);
	}
}
