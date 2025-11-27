import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsFilmInCalendar } from '@/types/models';

export const selectCalendarFilms: Selector = (
	state: State,
): ModelsFilmInCalendar[] => state.calendar.calendar;
