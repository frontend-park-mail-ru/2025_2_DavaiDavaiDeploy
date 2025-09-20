import { compose } from './compose'

export function applyMiddleware(middlewares) {
    return function createStoreWithMiddleware(createStore) {
        return (reducer, initialState) => {
            const store = createStore(reducer, initialState)

            const middlewareAPI = {
                getState: store.getState,
                dispatch: action => store.dispatch(action),
            }
            const chain = middlewares.map(middleware => middleware(middlewareAPI))
            const enhancedDispatch = compose(...chain)(store.dispatch)

            return {
                ...store,
                dispatch: enhancedDispatch,
            }
        }
    }
}