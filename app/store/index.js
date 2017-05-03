import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import appReducer from '../reducers'
import promise from './promise'


let middleware = [thunk, promise];

if (__DEV__) {
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant')();

    const logger = createLogger({collapsed: true});
    middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

const configureStore = () => {

    return createStore(
        appReducer,
        undefined,
        applyMiddleware(...middleware)
    );
}

export {
    configureStore
}
