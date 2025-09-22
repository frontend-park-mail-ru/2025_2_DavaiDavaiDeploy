import { applyMiddleware, createStore } from '../modules/redux'
import { middlewares } from './middlewares/index.js'
import { reducer } from './reducers/index.js'

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
