import { combineReducers } from '../../modules/redux'
import filmReducer from '../flim/reducers.js'
import userReducer from '../user/reducers.js'

export const reducer = combineReducers({ film: filmReducer, user: userReducer })
