import type { Action } from '@/modules/redux/types/actions';
import type { State } from '@/modules/redux/types/store';

const initialState = {
	count: 0,
};

export default function counterReducer(
	state: State = initialState,
	action: Action,
): State {
	if (typeof action === 'function') {
		return action(state);
	}

	switch (action.type) {
		case 'INCREMENT':
			return {
				...state,
				count: state.count + 1,
			};
		case 'DECREMENT':
			return {
				...state,
				count: state.count - 1,
			};
		default:
			return state;
	}
}
