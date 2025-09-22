import { applyMiddleware, combineReducers, createStore } from '@modules/redux'
import filmReducer from 'film/reducers.js'
import userReducer from 'user/reducers.js'
import { middlewares } from './middlewares/index.js'

const reducer = combineReducers({ film: filmReducer, user: userReducer })

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore)
export const store = createStoreWithMiddleware(reducer, initialState)
