import { CalendarPageFilmCard } from '@/components/calendarPageFilmCard/calendarPageFilmCard';
import { compose, connect } from '@/modules/redux';
import type { Dispatch } from '@/modules/redux/types/actions.ts';
import type { State } from '@/modules/redux/types/store.ts';
import { withRouter } from '@/modules/router/withRouter.tsx';
import actions from '@/redux/features/calendar/actions';
import { selectCalendarFilms } from '@/redux/features/calendar/selectors';
import type { Map } from '@/types/map';
import type { ModelsFilmInCalendar } from '@/types/models';
import { Component } from '@robocotik/react';
import { Flex, Title } from 'ddd-ui-kit';
import styles from './calendarPage.module.scss';

interface CalendarPageProps {
	films: ModelsFilmInCalendar[];
	getFilms: (limit: number, offset: number) => void;
}

const MAX_FILM_COUNT = 1000;
const OFFSET = 0;

class CalendarPageComponent extends Component<CalendarPageProps> {
	onMount() {
		this.props.getFilms(MAX_FILM_COUNT, OFFSET);
	}

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		return (
			<Flex className={styles.page} direction="column">
				<Title className={styles.title} level="2" weight="regular">
					Скоро в кино
				</Title>
				<Flex className={styles.films} direction="column" align="center">
					{this.props.films.map((film, index) => (
						<CalendarPageFilmCard film={film} number={index + 1} key={index} />
					))}
				</Flex>
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

export const CalendarPage = compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(CalendarPageComponent);
