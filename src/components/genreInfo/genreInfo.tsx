import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/genre/actions';
import { selectGenre } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';
import { Flex, Image, Paragraph, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withModal } from '../../modules/modals/withModal.tsx';
import type { WithModalProps } from '../../modules/modals/withModalProps.ts';
import styles from './genreInfo.module.scss';

interface GenreInfoProps {
	genre: ModelsGenre | null;
	error: string | null;
	getGenre: (id: string) => void;
}

class GenreInfoComponent extends Component<
	GenreInfoProps & WithRouterProps & WithModalProps
> {
	onMount() {
		this.props.getGenre(this.props.router.params.id);
	}

	render() {
		if (!this.props.genre) {
			return (
				<Title className={styles.err} level="2" weight="bold" color="accent">
					Жанр не найден
				</Title>
			);
		}

		const { title, description, icon } = this.props.genre;

		return (
			<Flex
				className={styles.genre}
				justify="center"
				align="center"
				direction="column"
			>
				<Image src={icon} alt={title} className={styles.title} />
				<Paragraph className={styles.description} level="8" align="center">
					{description}
				</Paragraph>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	genre: selectGenre(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getGenre: (id: string) => dispatch(actions.getGenreAction(id)),
});

export const GenreInfo = compose(
	withRouter,
	withModal,
	connect(mapStateToProps, mapDispatchToProps),
)(GenreInfoComponent);
