import { GenreCardGrid } from '@/components/genreCardGrid/genreCardGrid';
import { GenreInfo } from '@/components/genreInfo/genreInfo';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/genre/actions';
import type { Map } from '@/types/map';
import { Flex } from '@/uikit/index';
import { Component } from '@robocotik/react';
import styles from './genrePage.module.scss';

interface GenrePageProps {
	clearGenre: VoidFunction;
}

class GenrePageComponent extends Component<GenrePageProps> {
	onUnmount() {
		this.props.clearGenre();
	}

	render() {
		return (
			<Flex className={styles.page} direction="column">
				<GenreInfo />
				<Flex className={styles.films} direction="column">
					<GenreCardGrid />
				</Flex>
			</Flex>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	clearGenre: () => dispatch(actions.clearGenreAction()),
});

export const GenrePage = connect(
	undefined,
	mapDispatchToProps,
)(GenrePageComponent);
