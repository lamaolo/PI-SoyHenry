import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, compose, applyMiddleware } from 'redux';

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
