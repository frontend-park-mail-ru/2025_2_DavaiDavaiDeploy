import type { Action } from './actions'
import type { State } from './store'

/**
 * Редьюсер для обработки действий и изменения состояния.
 */
export type Reducer = (state: State, action: Action) => State
