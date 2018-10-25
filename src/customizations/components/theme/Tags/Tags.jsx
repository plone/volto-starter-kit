/**
 * Tags component.
 * @module components/theme/Tags/Tags
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import {
  defineMessages,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';

const messages = defineMessages({
  searchTag: {
    id: 'Search for tag {tag}',
    defaultMessage: 'Search for tag {tag}',
  },
});

/**
 * Tags component class.
 * @function Tags
 * @param {array} tags Array of tags.
 * @returns {string} Markup of the component.
 */
const Tags = ({ tags, intl }) =>
  tags && tags.length > 0 ? (
    <Container>
      <FormattedMessage id="Tags" defaultMessage="Tags" />:
      {tags.map(tag => (
        <Link
          className="ui label"
          to={`/search?Subject=${tag}`}
          key={tag}
          title={intl.formatMessage(messages.searchTag, { tag })}
        >
          {tag}
        </Link>
      ))}
    </Container>
  ) : (
    <span />
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  intl: intlShape.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  tags: null,
};

export default injectIntl(Tags);
