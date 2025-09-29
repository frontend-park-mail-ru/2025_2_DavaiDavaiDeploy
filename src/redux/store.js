import { applyMiddleware } from '../modules/redux/applyMiddleware/index.js'
import { createStore } from '../modules/redux/createStore/index.js'
import { reducer } from './features/index.js'
import { middlewares } from './middlewares/index.js'

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
