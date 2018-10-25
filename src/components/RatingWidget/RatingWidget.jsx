/**
 * RatingWidget component.
 * @module components/manage/Widgets/RatingWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Icon, Label, Rating } from 'semantic-ui-react';
import { map } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
});

/**
 * RatingWidget component class.
 * @function RatingWidget
 * @returns {string} Markup of the component.
 */
const RatingWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  onEdit,
  onDelete,
  intl,
}) => {
  const schema = {
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: ['title', 'id', 'description', 'required'],
      },
    ],
    properties: {
      id: {
        type: 'string',
        title: intl.formatMessage(messages.idTitle),
        description: intl.formatMessage(messages.idDescription),
      },
      title: {
        type: 'string',
        title: intl.formatMessage(messages.title),
      },
      description: {
        type: 'string',
        widget: 'textarea',
        title: intl.formatMessage(messages.description),
      },
      required: {
        type: 'boolean',
        title: intl.formatMessage(messages.required),
      },
    },
    required: ['id', 'title'],
  };

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={description ? 'help' : ''}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>
                {onEdit && (
                  <i
                    aria-hidden="true"
                    className="grey bars icon drag handle"
                  />
                )}
                {title}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            {onEdit && (
              <div className="toolbar">
                <a className="item" onClick={() => onEdit(id, schema)}>
                  <Icon name="write square" size="large" color="blue" />
                </a>
                <a className="item" onClick={() => onDelete(id)}>
                  <Icon name="close" size="large" color="red" />
                </a>
              </div>
            )}
            <Rating
              id={`field-${id}`}
              name={id}
              rating={value || 0}
              disabled={onEdit !== null}
              maxRating={5}
              onRate={(e, { rating }) => onChange(id, rating)}
            />
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
RatingWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.number,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  intl: intlShape.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
RatingWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: 0,
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(RatingWidget);
