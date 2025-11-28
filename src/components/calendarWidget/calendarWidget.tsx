import Arrow from '@/assets/img/arrowRight.svg?react';
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
import { Flex, Subhead, Title } from '@/uikit/index';
import { Component } from '@robocotik/react';
import { withAdaptivity } from '../../modules/adaptivity/withAdaptivity';
import type { WithAdaptivityProps } from '../../modules/adaptivity/withAdaptivityProps';
import { CalendarWidgetFilmCard } from '../calendarWidgetFilmCard/calendarWidgetFilmCard';
import styles from './calendarWidget.module.scss';

const MAX_FILM_COUNT = 6;
const SMALL_FILM_COUNT = 3;
const OFFSET = 0;

interface CalendarWidgetProps {
	films: ModelsFilmInCalendar[];
	getFilms: (limit: number, offset: number) => void;
}

class CalendarWidgetComponent extends Component<
	CalendarWidgetProps & WithRouterProps & WithAdaptivityProps
> {
	onMount() {
		this.props.getFilms(MAX_FILM_COUNT, OFFSET);
	}

	render() {
		if (!this.props.films || this.props.films.length === 0) {
			return <div />;
		}

		const filmCount = this.props.adaptivity.isWideDesktop
			? MAX_FILM_COUNT
			: SMALL_FILM_COUNT;

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
					{this.props.films.slice(0, filmCount).map((film, index) => {
						return (
							<CalendarWidgetFilmCard
								film={film}
								number={index + 1}
								key={index}
							/>
						);
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
	withAdaptivity,
	connect(mapStateToProps, mapDispatchToProps),
)(CalendarWidgetComponent);
