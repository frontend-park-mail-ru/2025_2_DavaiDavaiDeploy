import { ActorInfo } from '@/components/actorInfo/actorInfo';
import { FilmSlider } from '@/components/filmSlider/filmSlider';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps';
import { withRouter } from '@/modules/router/withRouter';
import actions from '@/redux/features/actor/actions';
import {
	selectActor,
	selectActorError,
	selectActorFilms,
	selectActorFilmsError,
	selectActorFilmsLoading,
	selectActorLoading,
} from '@/redux/features/actor/selectors';
import type { Map } from '@/types/map';
import type { ModelsActorPage, ModelsMainPageFilm } from '@/types/models';
import { Component } from '@robocotik/react';
import { Flex } from 'ddd-ui-kit';
import styles from './actorPage.module.scss';

const OFFSET = 0;
const FILM_COUNT = 100;

interface ActorPageProps {
	clearActor: VoidFunction;
	actor: ModelsActorPage | null;
	error: string | null;
	filmsError: string | null;
	getActor: (id: string) => void;
	films: ModelsMainPageFilm[];
	getFilms: (limit: number, offset: number, id: string) => void;
	actorLoading: boolean;
	actorFilmsLoading: boolean;
}

class ActorPageComponent extends Component<ActorPageProps & WithRouterProps> {
	onMount() {
		const actorId = this.props.router.params.id;
		this.props.getFilms(FILM_COUNT, OFFSET, actorId);
		this.props.getActor(actorId);
	}

	onUpdate() {
		if (
			this.props.actor &&
			this.props.actor.id !== this.props.router.params.id &&
			!this.props.actorLoading &&
			!this.props.actorFilmsLoading &&
			!this.props.error &&
			!this.props.filmsError
		) {
			this.props.clearActor();
			const actorId = this.props.router.params.id;
			this.props.getFilms(FILM_COUNT, OFFSET, actorId);
			this.props.getActor(actorId);
		}
	}

	onUnmount() {
		this.props.clearActor();
	}

	render() {
		const { actor, error, films } = this.props;

		return (
			<Flex className={styles.page} direction="column">
				<Flex className={styles.main} direction="column">
					<ActorInfo actor={actor} error={error} />
					<FilmSlider films={films} />
				</Flex>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectActorFilms(state),
	actor: selectActor(state),
	error: selectActorError(state),
	actorLoading: selectActorLoading(state),
	actorFilmsLoading: selectActorFilmsLoading(state),
	filmsError: selectActorFilmsError(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	clearActor: () => dispatch(actions.clearActorAction()),
	getFilms: (limit: number, offset: number, id: string) =>
		dispatch(actions.getActorFilmsAction(limit, offset, id)),
	getActor: (id: string) => dispatch(actions.getActorAction(id)),
});

export const ActorPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ActorPageComponent);
