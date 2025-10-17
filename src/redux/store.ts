import { applyMiddleware } from '../modules/redux/applyMiddleware/index'
import { createStore } from '../modules/redux/createStore/index'
import { reducer } from './features/index'
import { middlewares } from './middlewares/index'

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
