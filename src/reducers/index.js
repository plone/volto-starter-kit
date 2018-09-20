/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/plone-react/reducers';

/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  ...defaultReducers,
  // Place here your own local reducers
};

export default reducers;
