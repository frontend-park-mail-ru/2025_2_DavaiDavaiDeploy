import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/films/actions';
import { selectCursor, selectFilms } from '@/redux/features/films/selectors.js';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { CardGrid, Flex, Title } from '@/uikit/index';
import { Component, createRef } from '@robocotik/react';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmCardGrid.module.scss';

const ROOT_MARGIN = '200px';
const INITIAL_DELAY = 400;

interface FilmCardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (cursor: string) => void;
	cursor: string;
}

class FilmCardGridComponent extends Component<
	FilmCardGridProps & WithRouterProps
> {
	loadMoreTriggerRef = createRef<HTMLElement>();
	observer?: IntersectionObserver;

	onMount() {
		this.props.getFilms(this.props.cursor);

		this.observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					this.loadMoreFilms();
				}
			},
			{ rootMargin: ROOT_MARGIN },
		);

		setTimeout(() => {
			if (this.loadMoreTriggerRef.current && this.observer) {
				this.observer.observe(this.loadMoreTriggerRef.current);
			}
		}, INITIAL_DELAY);
	}

	onUnmount() {
		this.observer?.disconnect();
	}

	loadMoreFilms = () => {
		if (!this.props.cursor) {
			return;
		}

		this.props.getFilms(this.props.cursor);
	};

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.filmCardGrid} direction="column">
				<Title className={styles.title} level="4" weight="bold">
					Все фильмы
				</Title>
				<CardGrid>
					{this.props.films.map((film) => (
						<FilmCard film={film} />
					))}
				</CardGrid>
				<div
					className={styles.loadMoreTrigger}
					ref={this.loadMoreTriggerRef}
				></div>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectFilms(state),
	cursor: selectCursor(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (cursor: string) => dispatch(actions.getFilmsAction(cursor)),
});

export const FilmCardGrid = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(FilmCardGridComponent);
