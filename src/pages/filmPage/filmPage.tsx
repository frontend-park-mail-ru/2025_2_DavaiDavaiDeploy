import { FilmGallery } from '@/components/filmGallery/filmGallery';
import { FilmInfo } from '@/components/filmInfo/filmInfo';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import actions from '@/redux/features/film/actions';
import { selectFilm, selectFilmError } from '@/redux/features/film/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmPage } from '@/types/models';
import { Component } from '@robocotik/react';
import type { WithRouterProps } from '../../modules/router/types/withRouterProps.ts';
import { withRouter } from '../../modules/router/withRouter.tsx';
import styles from './filmPage.module.scss';

interface FilmPageProps {
	film: ModelsFilmPage | null;
	error: string | null;
	getFilm: (id: string) => void;
}

class FilmPageComponent extends Component<FilmPageProps & WithRouterProps> {
	onMount() {
		this.props.getFilm(this.props.router.params.id);
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
});

export const FilmPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmPageComponent);
