import { CompilationInfo } from '@/components/compilationInfo/compilationInfo';
import { CompilationPageFilmCard } from '@/components/compilationPageFilmCard/compilationPageFilmCard';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/compilations/actions';
import {
	selectCompilation,
	selectCompilationFilms,
} from '@/redux/features/compilations/selectors';
import type { Map } from '@/types/map';
import type { ModelsCompFilm, ModelsCompilation } from '@/types/models';
import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './compilationPage.module.scss';

interface CompilationPageProps {
	films: ModelsCompFilm[];
	compilation: ModelsCompilation;
	getFilms: (limit: number, offset: number, id: string) => void;
	getCompilation: (id: string) => void;
	clearCompilation: VoidFunction;
}

const MAX_FILM_COUNT = 6;
const OFFSET = 0;

class CompilationPageComponent extends Component<
	CompilationPageProps & WithRouterProps
> {
	onMount() {
		const { id } = this.props.router.params;
		this.props.getCompilation(id);
		this.props.getFilms(MAX_FILM_COUNT, OFFSET, id);
	}

	onUnmount() {
		this.props.clearCompilation();
	}

	render() {
		if (
			!this.props.compilation &&
			(!this.props.films || this.props.films.length === 0)
		) {
			return <div />;
		}

		const { compilation, films } = this.props;

		return (
			<Flex className={styles.page} direction="column">
				<CompilationInfo compilation={compilation} />
				<Flex className={styles.films} direction="column" align="center">
					{films.map((film, index) => (
						<CompilationPageFilmCard film={film} key={index} />
					))}
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectCompilationFilms(state),
	compilation: selectCompilation(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(actions.getCompilationFilmsAction(limit, offset, id)),
	getCompilation: (id: string) => dispatch(actions.getCompilationAction(id)),
	clearCompilation: () => dispatch(actions.clearCompilationAction()),
});

export const CompilationPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CompilationPageComponent);
