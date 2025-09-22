export function createThunkMiddleware(extraArgument) {
	return ({ dispatch, getState }) =>
		next =>
		action => {
			if (typeof action === 'function') {
				return action(dispatch, getState, extraArgument)
			}

			return next(action)
		}
}
