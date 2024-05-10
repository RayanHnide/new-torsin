/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
// import promise from 'redux-promise';
// import multi from 'redux-multi';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

// const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); //  "redux-devtools-extension": "^2.13.9"
let composeEnhancers = compose;
// to show store on redux extensions

const store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);

export default store;
