import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import express from 'express';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { createMemoryHistory } from 'history';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { Html, Api, persistAuthToken, generateSitemap } from './helpers';
import { parse as parseUrl } from 'url';
import { keys } from 'lodash';
import Raven from 'raven';

import cookie, { plugToRequest } from 'react-cookie';
import ErrorPage from './error';

import locale from 'locale';

import routes from './routes';
import languages from './constants/Languages';
import nlLocale from '../dist/locales/nl.json';
import deLocale from '../dist/locales/de.json';
import enLocale from '../dist/locales/en.json';

import configureStore from './store';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const supported = new locale.Locales(keys(languages), 'en');
const locales = {
  en: enLocale,
  nl: nlLocale,
  de: deLocale,
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    plugToRequest(req, res);
    const api = new Api(req);

    const url = req.originalUrl || req.url;
    const location = parseUrl(url);

    const lang = new locale.Locales(
      cookie.load('lang') || req.headers['accept-language'],
    )
      .best(supported)
      .toString();
    const initialState = {
      intl: {
        defaultLocale: 'en',
        locale: lang,
        messages: locales[lang],
      },
    };
    const history = createMemoryHistory({
      initialEntries: [req.url],
    });

    // Create a new Redux store instance
    const store = configureStore(initialState, history, api);

    loadOnServer({ store, location, routes, api })
      .then(() => {
        const context = {};
        const markup = renderToString(
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <ReduxAsyncConnect routes={routes} helpers={api} />
            </StaticRouter>
          </Provider>,
        );

        // Grab the initial state from our Redux store
        const finalState = store.getState();

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(200).send(
            `<!doctype html>
        <html lang="">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${
                    assets.client.js
                  }" defer crossorigin></script>`
            }
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
        </html>`,
          );
        }
      })
      .catch(error => {
        const errorPage = <ErrorPage message={error.message} />;

        if (process.env.SENTRY_DSN) {
          Raven.captureException(error.message, {
            extra: JSON.stringify(error),
          });
        }
        res.set({
          'Cache-Control': 'public, max-age=60, no-transform',
        });
        res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
      });
  });

export default server;
