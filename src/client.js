import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Api, persistAuthToken } from './helpers';
import { ReduxAsyncConnect } from 'redux-connect';

// import { App } from './components';
const history = createBrowserHistory();
const api = new Api();

const store = configureStore(window.__PRELOADED_STATE__, history, api);

const routes = [
  {
    path: '/',
    component: App,
  },
];

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <ReduxAsyncConnect routes={routes} helpers={api} />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
