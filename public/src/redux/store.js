import { applyMiddleware } from '../modules/redux/applyMiddleware.js'
import { createStore } from '../modules/redux/createStore.js'
import { middlewares } from './middlewares/index.js'
import { reducer } from './reducers/index.js'

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
