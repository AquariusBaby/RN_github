import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import {middleware} from '../navigator/AppNavigators';

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log('dispatching', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
  return result;
};

// 中间件
const middlewares = [
  middleware,
  logger,
  thunk
];

export default createStore(reducers, applyMiddleware(...middlewares));
