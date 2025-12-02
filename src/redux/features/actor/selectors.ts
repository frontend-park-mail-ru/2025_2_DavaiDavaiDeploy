import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsActorPage, ModelsMainPageFilm } from '@/types/models';

export const selectActor: Selector = (state: State): ModelsActorPage =>
	state.actor.curActor;

export const selectActorFilms: Selector = (
	state: State,
): ModelsMainPageFilm[] => state.actor.actorFilms;

export const selectActorError: Selector = (state: State): string | null =>
	state.actor.actorError;

export const selectActorFilmsError: Selector = (state: State): string | null =>
	state.actor.actorFilmsError;

export const selectActorFilmsLoading: Selector = (state: State): boolean =>
	state.actor.actorFilmsLoading;

export const selectActorLoading: Selector = (state: State): boolean =>
	state.actor.actorLoading;
