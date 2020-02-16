import { compose, createStore, applyMiddleware } from 'redux';
import hangmanReducer from './reducers/HangmanReducer';
import {DEBUG} from './Utils';

const middlewares = [];

if (DEBUG) {
	console.log("Store.js: development mode");
	const { logger } = require(`redux-logger`);
	middlewares.push(logger);
}

const store = createStore(
	hangmanReducer,
	compose(applyMiddleware(...middlewares)),
);

export default store;
