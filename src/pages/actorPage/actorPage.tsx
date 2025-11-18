import { ActorInfo } from '@/components/actorInfo/actorInfo';
import { FilmSlider } from '@/components/filmSlider/filmSlider';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/actor/actions';
import type { Map } from '@/types/map';
import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './actorPage.module.scss';

interface ActorPageProps {
	clearActor: VoidFunction;
}

class ActorPageComponent extends Component<ActorPageProps> {
	onUnmount() {
		this.props.clearActor();
	}

	render() {
		return (
			<Flex className={styles.page} direction="column">
				<Flex className={styles.main} direction="column">
					<ActorInfo />
					<FilmSlider />
				</Flex>
			</Flex>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	clearActor: () => dispatch(actions.clearActorAction()),
});

export const ActorPage = connect(
	undefined,
	mapDispatchToProps,
)(ActorPageComponent);
