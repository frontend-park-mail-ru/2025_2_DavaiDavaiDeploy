import { applyMiddleware } from './applyMiddleware/index';
import { combineReducers } from './combineReducers/index';
import { compose } from './compose/index';
import { connect, StoreContext } from './connect/index';
import { createStore } from './createStore/index';
import { Provider } from './Provider/index';

export {
	applyMiddleware,
	combineReducers,
	compose,
	connect,
	createStore,
	Provider,
	StoreContext,
};
