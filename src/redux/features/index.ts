import { combineReducers } from '@/modules/redux/index'
import filmReducer from './film/reducers'
import genreReducer from './genre/reducers'
import userReducer from './user/reducers'

/**
 * Главный редьюсер приложения, объединяющий все feature-редьюсеры.
 * @type {Function}
 */
export const reducer = combineReducers({
	film: filmReducer,
	user: userReducer,
	genre: genreReducer,
})
