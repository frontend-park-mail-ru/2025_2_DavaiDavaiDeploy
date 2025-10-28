import { Component } from '@react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './cardGrid.module.scss';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/films/actions';
import { selectFilms } from '@/redux/features/films/selectors.js';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';

const FILM_COUNT: number = 50;
const OFFSET: number = 0;

interface CardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number) => void;
}

class CardGridComponent extends Component<CardGridProps> {
	onMount(): void {
		this.props.getFilms(FILM_COUNT, OFFSET);
	}

	render() {
		if (this.props.films.length === 0) {
			return <div>Loading...</div>;
		}

		return (
			<div className={styles.cardGrid}>
				<h2 className={styles.title}>Все фильмы</h2>
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

export const CardGrid = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CardGridComponent);
