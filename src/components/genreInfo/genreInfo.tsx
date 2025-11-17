import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/genre/actions';
import { selectGenre } from '@/redux/features/genre/selectors';
import type { Map } from '@/types/map';
import type { ModelsGenre } from '@/types/models';
import { Title } from '@/uikit/title/title.tsx';
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
				<Title
					className={styles.err}
					text="Жанр не найден"
					size="5xl"
					weight="bold"
					color="accent"
				/>
			);
		}

		const { title, description, icon } = this.props.genre;

		const titleSRC = getImageURL(icon);

		return (
			<div className={styles.genre}>
				<img src={titleSRC} alt={title} className={styles.title} />
				<p className={styles.description}>{description}</p>
			</div>
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
