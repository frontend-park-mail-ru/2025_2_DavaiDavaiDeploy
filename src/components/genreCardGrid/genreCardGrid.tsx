import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter.tsx';
import genreActions from '@/redux/features/genre/actions';
import {
	selectGenreFilms,
	selectGenreFilmsError,
} from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import { CardGrid, Flex } from 'ddd-ui-kit';
import { FilmCard } from '../filmCard/filmCard';
import styles from './genreCardGrid.module.scss';

const FILM_COUNT: number = 1000;
const OFFSET: number = 0;

interface GenreCardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number, id?: string) => void;
}

class GenreCardGridComponent extends Component<
	GenreCardGridProps & WithRouterProps
> {
	onMount() {
		this.props.getFilms(FILM_COUNT, OFFSET, this.props.router.params.id);
	}

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.GenreCardGrid} direction="column">
				<CardGrid>
					{this.props.films.map((film) => (
						<FilmCard film={film} />
					))}
				</CardGrid>
			</Flex>
		);
	}
}

const MapStateToProps = (state: State): Map => ({
	films: selectGenreFilms(state),
	error: selectGenreFilmsError(state),
});

const MapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(genreActions.getGenreFilmsAction(limit, offset, id)),
});

export const GenreCardGrid = compose(
	withRouter,
	connect(MapStateToProps, MapDispatchToProps),
)(GenreCardGridComponent);
