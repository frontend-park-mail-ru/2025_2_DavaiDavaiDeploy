export type Action = { type: string; payload?: any } | Function

export type Dispatch = (action: Action) => any

export type State = Record<string, any>

export type Reducer = (state: State, action: Action) => State

type MiddlewareAPI = {
	dispatch: Dispatch
	getState: () => State
}

export type Middleware = (middlewareAPI: MiddlewareAPI) => any

export type Store = {
	getState: () => State
	dispatch: (action: Action) => void
	subscribe: (listener: () => void) => () => void
}
