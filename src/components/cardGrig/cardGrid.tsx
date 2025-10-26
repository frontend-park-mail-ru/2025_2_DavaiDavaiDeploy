import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectFilms } from '@/redux/features/film/selectors.js';
import type { ModelsFilm } from '@/types/models';
import { Component } from '@react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './cardGrid.module.scss';

interface CardGridProps {
	films: ModelsFilm[];
	getFilms: (limit: number, offset: number) => void;
}

class CardGridComponent extends Component<CardGridProps> {
	onMount(): void | Promise<void> {
		this.props.getFilms(50, 0);
	}

	render() {
		if (this.props.films.length === 0) {
			return <div>Loading...</div>;
		}
		console.log(this.props.films[0]);

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

const mapStateToProps = (state: State) => ({
	films: selectFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getFilms: (limit: number, offset: number) =>
		dispatch(actions.getFilmsAction(limit, offset)),
});

export const CardGrid = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CardGridComponent);

interface CardGridProps {
	films: ModelsFilm[];
	getFilms: (limit: number, offset: number) => void;
}
