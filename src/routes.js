/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/plone-react/components';
import { defaultRoutes } from '@plone/plone-react/routes';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Add your routes here
      ...defaultRoutes,
    ],
  },
];

export default routes;
