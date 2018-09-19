import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-intl-redux';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Api, persistAuthToken } from './helpers';
import { ReduxAsyncConnect } from 'redux-connect';
import routes from './routes';

const history = createBrowserHistory();
const api = new Api();

const store = configureStore(window.__PRELOADED_STATE__, history, api);

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
