import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';
import { Link } from '@/modules/router/link.tsx';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/calendar/actions';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsCompilation } from '@/types/models';
import { Flex, Image, Subhead } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './compilationWidgetCard.module.scss';

interface CompilationWidgetCardProps {
	compilation: ModelsCompilation;
}

class CompilationWidgetCardComponent extends Component<
	CompilationWidgetCardProps & WithRouterProps
> {
	render() {
		const { id, title, description, icon } = this.props.compilation;

		return (
			<Link href={`/compilations/${id}`} className={styles.linkWrap}>
				<Flex className={styles.compilationCard} align="center">
					<Image className={styles.image} src={icon} alt={title} />
					<Subhead className={styles.description} level="11" align="left">
						{description}
					</Subhead>
				</Flex>
			</Link>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	isAuthentificated: selectIsAuthentificated(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	deleteFromFavorites: (id: string) =>
		dispatch(actions.deleteFromFavoritesAction(id)),
	addToFavorites: (id: string) => dispatch(actions.addToFavoritesAction(id)),
});

export const CompilationWidgetCard = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CompilationWidgetCardComponent);
