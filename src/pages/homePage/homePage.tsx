import { CalendarWidget } from '@/components/calendarWidget/calendarWidget';
import { CompilationWidget } from '@/components/compilationWidget/compilationWidget';
import { FilmCardGrid } from '@/components/filmCardGrid/filmCardGrid';
import { FilmsLine } from '@/components/filmsLine/filmsLine';
import { GenreSlider } from '@/components/genreSlider/genreSlider';
import { PromoFilm } from '@/components/promoFilm/promoFilm';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/films/actions';
import { selectRecommendations } from '@/redux/features/films/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './homePage.module.scss';

interface HomePageProps {
	recommendations: ModelsMainPageFilm[] | null;
	getReccomendations: VoidFunction;
}

export class HomePageComponent extends Component<HomePageProps> {
	onMount() {
		this.props.getReccomendations();
	}

	render() {
		return (
			<Flex className={styles.page} direction="column">
				<Flex className={styles.main} direction="column">
					<PromoFilm />
					<GenreSlider />
					<CompilationWidget />
					<FilmsLine
						films={this.props.recommendations}
						title="Специально для вас"
						className={styles.recs}
					/>
					<CalendarWidget />
					<Flex className={styles.films} direction="column">
						<FilmCardGrid />
					</Flex>
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	recommendations: selectRecommendations(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getReccomendations: () => dispatch(actions.getRecommendationsAction()),
});

export const HomePage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(HomePageComponent);
