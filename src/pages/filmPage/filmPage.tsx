import { Film } from '@/components/film/film';
import { FilmGallery } from '@/components/filmGallery/filmGallery';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { RouterContext } from '@/modules/router/routerContext';
import actions from '@/redux/features/film/actions';
import { selectFilm } from '@/redux/features/film/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './filmPage.module.scss';

interface FilmPageProps {
	film: ModelsFilmPage;
	getFilm: (id: string) => void;
}

class FilmPageComponent extends Component<FilmPageProps> {
	static readonly contextType = RouterContext;

	onMount(): void {
		this.props.getFilm(this.context.params.id);
	}

	render() {
		return (
			<div className={styles.page}>
				<Film film={this.props.film} />
				<section className={styles.content}>
					<div className={styles.left}></div>
					<div className={styles.right}>
						<FilmGallery film={this.props.film} />
					</div>
				</section>
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	film: selectFilm(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilm: (id: string) => dispatch(actions.getFilmAction(id)),
});

export const FilmPage = connect(
	mapStateToProps,
	mapDispatchToProps,
)(FilmPageComponent);
