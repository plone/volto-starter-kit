/**
 * Faq reducer.
 * @module reducers/faq/faq
 */

import { map } from 'lodash';
import { settings } from '~/config';

import { GET_FAQ } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

/**
 * Faq reducer.
 * @function faq
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function faq(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_FAQ}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_FAQ}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: map(action.result.items, item => ({
          ...item,
          '@id': item['@id'].replace(settings.apiPath, ''),
        })),
        loaded: true,
        loading: false,
      };
    case `${GET_FAQ}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
