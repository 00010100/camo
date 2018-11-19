import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './SectionChoice.css';

export default class SectionChoice extends Component {
  static propTypes = {
    choiceSection: PropTypes.func.isRequired,
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    activeIndex: 0,
  };

  handleRadio = (evt) => {
    this.setState({ activeIndex: parseInt(evt.target.value) });
    this.props.choiceSection(parseInt(evt.target.value));
  };

  renderSection() {
    const { sections } = this.props;

    return _.map(sections, (item, i) => {
      const index = parseInt(i);
      const isCurrent = this.state.activeIndex === index;
      const selected = isCurrent ? 'active' : '';

      return (
        <label className={`btn btn-primary ${selected}`} key={item}>
          <input type="radio" name="options" onChange={this.handleRadio} value={index} />
          {index + 1}
        </label>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <p align="center">Section: </p>
        <div className="btn-group btn-group-toggle button-container" data-toggle="buttons">
          {this.renderSection()}
        </div>
      </Fragment>
    );
  }
}
