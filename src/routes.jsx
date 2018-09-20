/**
 * Routes.
 * @module routes
 */
import React from 'react';

import { App } from '@plone/plone-react/components';

import defaultRoutes from '@plone/plone-react/routes';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App,
    routes: [
      // Place here your own custom routes
      ...defaultRoutes,
    ],
  },
];

export default routes;
