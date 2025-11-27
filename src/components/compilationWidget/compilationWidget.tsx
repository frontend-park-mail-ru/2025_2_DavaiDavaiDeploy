import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/compilations/actions';
import { selectCompilations } from '@/redux/features/compilations/selectors';
import type { Map } from '@/types/map';
import type { ModelsCompilation } from '@/types/models';
import { Flex, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { CompilationWidgetCard } from '../compilationWidgetCard/compilationWidgetCard';
import styles from './compilationWidget.module.scss';

interface CompilationWidgetProps {
	compilations: ModelsCompilation[];
	getCompilations: VoidFunction;
}

class CompilationWidgetComponent extends Component<
	CompilationWidgetProps & WithRouterProps
> {
	onMount() {
		this.props.getCompilations();
	}

	render() {
		if (!this.props.compilations || this.props.compilations.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.compilationWidget} direction="column">
				<Title className={styles.title} level="4" weight="bold">
					Подборки
				</Title>
				<Flex className={styles.compilations} direction="row">
					{this.props.compilations.map((compilation, index) => (
						<CompilationWidgetCard compilation={compilation} key={index} />
					))}
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	compilations: selectCompilations(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getCompilations: () => dispatch(actions.getCompilationsAction()),
});

export const CompilationWidget = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CompilationWidgetComponent);
