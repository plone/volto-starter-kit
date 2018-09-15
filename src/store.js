import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers';

const configureStore = (initialState, history) => {
  const middlewares = composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk),
  );
  const store = createStore(
    connectRouter(history)(rootReducer),
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
