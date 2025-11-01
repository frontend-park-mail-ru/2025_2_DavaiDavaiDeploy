import { getImageSRC } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { RouterContext } from '@/modules/router/routerContext';
import actions from '@/redux/features/genre/actions';
import { selectGenre } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './genreInfo.module.scss';

interface GenreInfoProps {
	genre: ModelsGenre | null;
	error: string | null;
	getGenre: (id: string) => void;
}

class GenreInfoComponent extends Component<GenreInfoProps> {
	static readonly contextType = RouterContext;

	onMount() {
		this.props.getGenre(this.context.params.id);
	}

	render() {
		if (!this.props.genre) {
			return <div className={styles.err}>Загрузка жанра</div>;
		}

		const { id, title, description } = this.props.genre;

		const titleSRC = getImageSRC('genres', id, 'svg');

		return (
			<div className={styles.genre}>
				<img src={titleSRC} alt={title} className={styles.title} />
				<p className={styles.description}>{description}</p>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	genre: selectGenre(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getGenre: (id: string) => dispatch(actions.getGenreAction(id)),
});

export const GenreInfo = connect(
	mapStateToProps,
	mapDispatchToProps,
)(GenreInfoComponent);
