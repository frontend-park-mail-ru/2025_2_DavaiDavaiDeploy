import { combineReducers } from '../../modules/redux/index.js'
import filmReducer from './film/reducers.js'
import genreReducer from './genre/reducers.js'
import todosReducer from './todos/reducers.js'
import userReducer from './user/reducers.js'

export const reducer = combineReducers({
	film: filmReducer,
	user: userReducer,
	genre: genreReducer,
	todos: todosReducer,
})
