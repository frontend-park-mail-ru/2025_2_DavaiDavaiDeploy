import type { Selector } from '@/modules/redux/types/selectors';
import type { State } from '@/modules/redux/types/store';

export const selectIsSuccess: Selector = (state: State): boolean =>
	!state.techSup.error && !state.techSup.loading;
