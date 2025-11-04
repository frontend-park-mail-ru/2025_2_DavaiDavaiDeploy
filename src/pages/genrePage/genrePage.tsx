import { GenreCardGrid } from '@/components/genreCardGrid/genreCardGrid';
import { GenreInfo } from '@/components/genreInfo/genreInfo';
import { connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import actions from '@/redux/features/genre/actions';
import type { Map } from '@/types/map';
import { Component } from '@robocotik/react';
import styles from './genrePage.module.scss';

interface GenrePageProps {
	clearGenre: VoidFunction;
}

export class GenrePageComponent extends Component<GenrePageProps> {
	onUnmount() {
		this.props.clearGenre();
	}

	render() {
		return (
			<div className={styles.page}>
				<GenreInfo />
				<section className={styles.films}>
					<GenreCardGrid />
				</section>
			</div>
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
