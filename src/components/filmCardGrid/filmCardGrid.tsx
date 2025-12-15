import { debounce } from '@/helpers/debounceHelper/debounceHelper';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/films/actions';
import { selectCursor, selectFilms } from '@/redux/features/films/selectors.js';
import type { Map } from '@/types/map';
import type { ModelsMainPageFilm } from '@/types/models';
import { Component, createRef } from '@robocotik/react';
import { CardGrid, Flex, Title } from 'ddd-ui-kit';
import { FilmCard } from '../filmCard/filmCard';
import styles from './filmCardGrid.module.scss';

interface FilmCardGridProps {
	films: ModelsMainPageFilm[];
	getFilms: (cursor: string) => void;
	cursor: string;
}

const DEBOUNCE_DELAY: number = 300;

class FilmCardGridComponent extends Component<
	FilmCardGridProps & WithRouterProps
> {
	loadMoreTriggerRef = createRef<HTMLElement>();
	observer?: IntersectionObserver;

	onMount() {
		this.props.getFilms(this.props.cursor);

		const debouncedLoadHandler = debounce(this.loadMoreFilms, DEBOUNCE_DELAY);

		this.observer = new IntersectionObserver(debouncedLoadHandler, {
			rootMargin: '200px',
		});

		if (this.loadMoreTriggerRef.current && this.observer) {
			this.observer.observe(this.loadMoreTriggerRef.current);
		}
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
				<div ref={this.loadMoreTriggerRef} className={styles.loadMoreTrigger} />
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
