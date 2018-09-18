import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { api, crashReporter } from './middleware';
import reducers from './reducers';

const configureStore = (initialState, history, apiHelper) => {
  const middlewares = composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk, api(apiHelper)),
  );
  const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    initialState,
    middlewares,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(connectRouter(history)(nextRootReducer));
    });
  }

  return store;
};

export default configureStore;
