/**
 * Faq view.
 * @module components/FaqView/FaqView
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';

import { getFaq } from '../../actions';

/**
 * FaqView class.
 * @class FaqView
 * @extends Component
 */
@connect(
  state => ({
    items: state.faq.items,
  }),
  dispatch => bindActionCreators({ getFaq }, dispatch),
)
class FaqView extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getFaq: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getFaq();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-faq">
        <Helmet title="FAQ" />
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">FAQ</h1>
            </header>
            <section id="content-core">
              {this.props.items.map(item => (
                <article className="tileItem" key={item['@id']}>
                  <h2 className="tileHeadline">{item.title}</h2>
                  {item.description && (
                    <div className="tileBody">
                      <span className="description">{item.description}</span>
                    </div>
                  )}
                  <div className="visualClear" />
                </article>
              ))}
            </section>
          </article>
        </div>
      </Container>
    );
  }
}

export default FaqView;
