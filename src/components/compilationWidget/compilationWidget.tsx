import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/compilations/actions';
import { selectCompilationFilms } from '@/redux/features/compilations/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmInCalendar } from '@/types/models';
import { Flex, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { CompilationWidgetCard } from '../compilationWidgetCard/compilationWidgetCard';
import styles from './compilationWidget.module.scss';

interface CompilationWidgetProps {
	films: ModelsFilmInCalendar[];
	getCompilations: VoidFunction;
}

class CompilationWidgetComponent extends Component<
	CompilationWidgetProps & WithRouterProps
> {
	onMount() {
		this.props.getCompilations();
	}

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.compilationWidget} direction="column">
				<Title className={styles.title} level="4" weight="bold">
					Подборки
				</Title>
				<div className={styles.films}>
					{this.props.films.map((compilation, index) => {
						return (
							<CompilationWidgetCard compilation={compilation} key={index} />
						);
					})}
				</div>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectCompilationFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getCompilations: () => dispatch(actions.getCompilationsAction()),
});

export const CompilationWidget = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CompilationWidgetComponent);
