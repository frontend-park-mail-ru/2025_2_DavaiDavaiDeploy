import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/films/actions';
import { selectFilms } from '@/redux/features/films/selectors.js';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { CardGrid } from '@/uikit/cardGrig/cardGrid';
import { Flex } from '@/uikit/flex/flex';
import { Title } from '@/uikit/title/title';
import { Component } from '@robocotik/react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmCardGrid.module.scss';

const FILM_COUNT: number = 50;
const OFFSET: number = 0;

interface FilmCardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number, id?: string) => void;
}

class FilmCardGridComponent extends Component<
	FilmCardGridProps & WithRouterProps
> {
	onMount() {
		this.props.getFilms(FILM_COUNT, OFFSET);
	}

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div></div>;
		}

		return (
			<Flex className={styles.filmCardGrid} direction="column">
				<Title className={styles.title} size="3xl" weight="bold">
					Все фильмы
				</Title>
				<CardGrid>
					{this.props.films.map((film) => (
						<FilmCard film={film} />
					))}
				</CardGrid>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number) =>
		dispatch(actions.getFilmsAction(limit, offset)),
});

export const FilmCardGrid = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmCardGridComponent);
