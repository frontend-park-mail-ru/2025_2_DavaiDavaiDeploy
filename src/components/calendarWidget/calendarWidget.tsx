import Arrow from '@/assets/arrowRight.svg?react';
import { WIDE_SCREEN_WIDTH } from '@/consts/devices';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { Link } from '@/modules/router/link';
import type { WithRouterProps } from '@/modules/router/types/withRouterProps.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/calendar/actions';
import { selectCalendarFilms } from '@/redux/features/calendar/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmInCalendar } from '@/types/models';
import { Component } from '@robocotik/react';
import { debounce } from '@sentry/core';
import { Flex, Subhead, Title } from 'ddd-ui-kit';
import { CalendarWidgetFilmCard } from '../calendarWidgetFilmCard/calendarWidgetFilmCard';
import styles from './calendarWidget.module.scss';

const MAX_FILM_COUNT = 6;
const SMALL_FILM_COUNT = 3;
const OFFSET = 0;
const DEBOUNCE_DELAY = 100;

interface CalendarWidgetProps {
	films: ModelsFilmInCalendar[];
	getFilms: (limit: number, offset: number) => void;
}

interface CalendarWidgetState {
	debounceResizeHandler: (ev?: Event | undefined) => void;
	filmCount: number;
}

class CalendarWidgetComponent extends Component<
	CalendarWidgetProps & WithRouterProps,
	CalendarWidgetState
> {
	state: CalendarWidgetState = {
		debounceResizeHandler: () => {},
		filmCount: MAX_FILM_COUNT,
	};

	onMount() {
		this.props.getFilms(MAX_FILM_COUNT, OFFSET);
		const debounceResizeHandler = debounce(this.handleResize, DEBOUNCE_DELAY);
		this.setState({ debounceResizeHandler });
		window.addEventListener('resize', debounceResizeHandler);
		this.handleResize();
	}

	handleResize = () => {
		const width = window.innerWidth;
		this.setState({
			filmCount: width <= WIDE_SCREEN_WIDTH ? SMALL_FILM_COUNT : MAX_FILM_COUNT,
		});
	};

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.calendarWidget} direction="column">
				<Title className={styles.title} level="4" weight="bold">
					Календарь релизов
				</Title>
				<Link href="/calendar" className={styles.linkWrap}>
					<Flex direction="row" align="center" className={styles.soon}>
						<Subhead level="7" color="light" className={styles.subtitle}>
							Скоро в кино
						</Subhead>
						<Arrow className={styles.arrow} />
					</Flex>
				</Link>
				<div className={styles.films}>
					{this.props.films.map((film, index) => {
						if (index < this.state.filmCount) {
							return (
								<CalendarWidgetFilmCard
									film={film}
									number={index + 1}
									key={index}
								/>
							);
						}
					})}
				</div>
			</Flex>
		);
	}
}

const mapStateToProps = (state: State): Map => ({
	films: selectCalendarFilms(state),
});

const mapDispatchToProps = (dispatch: Dispatch): Map => ({
	getFilms: (limit: number, offset: number) =>
		dispatch(actions.getCalendarAction(limit, offset)),
});

export const CalendarWidget = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CalendarWidgetComponent);
