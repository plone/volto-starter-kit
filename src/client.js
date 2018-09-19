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

import 'semantic-ui-less/semantic.less';
import './static/overrides.css';

const history = createBrowserHistory();
const api = new Api();

const store = configureStore(window.__PRELOADED_STATE__, history, api);
persistAuthToken(store);

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <ReduxAsyncConnect routes={routes} helpers={api} />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main'),
);

if (module.hot) {
  module.hot.accept();
}
