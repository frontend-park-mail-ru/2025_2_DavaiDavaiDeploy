import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';
import type { ModelsSearchResponse } from '@/types/models';

export const selectSearchResult: Selector = (
	state: State,
): ModelsSearchResponse => state.search.searchResult;

export const selectVoiceSearchResult: Selector = (
	state: State,
): ModelsSearchResponse => state.search.voiceSearchResult;

export const selectVoiceIsWorking: Selector = (
	state: State,
): ModelsSearchResponse => state.search.voiceSearchIsWorking;
