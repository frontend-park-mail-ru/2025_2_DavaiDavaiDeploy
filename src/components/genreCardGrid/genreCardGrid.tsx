import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import genreActions from '@/redux/features/genre/actions';
import { selectGenreFilms } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import { CardGridComponent } from '../cardGrig/cardGrid';

const MapStateToProps = (state: State): Map => ({
	films: selectGenreFilms(state),
});

const MapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(genreActions.getGenreFilmsAction(limit, offset, id)),
});

export const GenreCardGrid = compose(
	withRouter,
	connect(MapStateToProps, MapDispatchToProps),
)(CardGridComponent);
