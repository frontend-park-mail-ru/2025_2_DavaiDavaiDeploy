import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/films/actions';
import { selectRecommendations } from '@/redux/features/films/selectors.js';
import { selectIsAuthentificated } from '@/redux/features/user/selectors';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component, createRef } from '@robocotik/react';
import { FilmsLine } from '../filmsLine/filmsLine';
import styles from './recommendations.module.scss';

interface RecommendationsProps {
	recommendations: ModelsMainPageFilm[] | null;
	getReccomendations: VoidFunction;
	isAuthentificated: boolean;
}

class RecommendationsComponent extends Component<
	RecommendationsProps & WithRouterProps
> {
	loadMoreTriggerRef = createRef<HTMLElement>();
	observer?: IntersectionObserver;

	onMount() {
		if (!this.props.isAuthentificated) {
			return;
		}

		this.props.getReccomendations();
	}

	render() {
		if (!this.props.isAuthentificated) {
			return <div />;
		}

		return (
			<FilmsLine
				films={this.props.recommendations}
				title="Специально для вас"
				className={styles.recs}
			/>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	recommendations: selectRecommendations(state),
	isAuthentificated: selectIsAuthentificated(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getReccomendations: () => dispatch(actions.getRecommendationsAction()),
});

export const Recommendations = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(RecommendationsComponent);
