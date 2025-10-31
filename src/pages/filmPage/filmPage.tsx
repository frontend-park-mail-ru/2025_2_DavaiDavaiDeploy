import { FilmGallery } from '@/components/filmGallery/filmGallery';
import { FilmInfo } from '@/components/filmInfo/filmInfo';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { RouterContext } from '@/modules/router/routerContext';
import actions from '@/redux/features/film/actions';
import { selectFilm, selectFilmError } from '@/redux/features/film/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import styles from './filmPage.module.scss';

interface FilmPageProps {
	film: ModelsFilmPage | null;
	error: string | null;
	getFilm: (id: string) => void;
	clearFilm: VoidFunction;
}

class FilmPageComponent extends Component<FilmPageProps> {
	static readonly contextType = RouterContext;

	onMount() {
		this.props.getFilm(this.context.params.id);
	}

	onUnmount(): void | Promise<void> {
		this.props.clearFilm();
	}

	render() {
		return (
			<div className={styles.page}>
				<FilmInfo film={this.props.film} error={this.props.error} />
				{this.props.film && (
					<section className={styles.content}>
						<div className={styles.left}></div>
						<div className={styles.right}>
							<FilmGallery film={this.props.film} />
						</div>
					</section>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	film: selectFilm(state),
	error: selectFilmError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilm: (id: string) => dispatch(actions.getFilmAction(id)),
	clearFilm: () => dispatch(actions.clearFilmAction()),
});

export const FilmPage = connect(
	mapStateToProps,
	mapDispatchToProps,
)(FilmPageComponent);
