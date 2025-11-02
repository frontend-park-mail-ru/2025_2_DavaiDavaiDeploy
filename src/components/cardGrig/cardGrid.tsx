import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/films/actions';
import { selectFilms } from '@/redux/features/films/selectors.js';
import genreActions from '@/redux/features/genre/actions';
import { selectGenreFilms } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './cardGrid.module.scss';

const FILM_COUNT: number = 50;
const OFFSET: number = 0;

interface CardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number, id?: string) => void;
}

class CardGridComponent extends Component<CardGridProps & WithRouterProps> {
	onMount() {
		if (this.props.router.params.id) {
			this.props.getFilms(FILM_COUNT, OFFSET, this.props.router.params.id);
		} else {
			this.props.getFilms(FILM_COUNT, OFFSET);
		}
	}

	render() {
		if (this.props.films.length === 0) {
			return <div className={styles.err}>Загрузка фильмов</div>;
		}

		return (
			<div className={styles.cardGrid}>
				{!this.props.router.params.id && (
					<h2 className={styles.title}>Все фильмы</h2>
				)}
				<div className={styles.grid}>
					{this.props.films.map((film) => (
						<FilmCard film={film} />
					))}
				</div>
			</div>
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

export const CardGrid = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CardGridComponent);

const genreMapStateToProps = (state: State): Map => ({
	films: selectGenreFilms(state),
});

const genreMapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(genreActions.getGenreFilmsAction(limit, offset, id)),
});

export const GenreCardGrid = compose(
	withRouter,
	connect(genreMapStateToProps, genreMapDispatchToProps),
)(CardGridComponent);
