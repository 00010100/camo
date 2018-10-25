import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './Dropdown.css';

export default class Dropdown extends Component {
  static propTypes = {
    choiceTitle: PropTypes.func.isRequired,
    titles: PropTypes.objectOf(PropTypes.string).isRequired
  };

  state = {
    titleIndex: 0
  };

  handleChange = (evt) => {
    this.setState({ titleIndex: parseInt(evt.target.value) });
    this.props.choiceTitle(parseInt(evt.target.value));
  };

  renderOptions = () => {
    const { titles } = this.props;

    return _.map(titles, (title, index) => (
      <option key={index} value={index}>
        {title}
      </option>
    ));
  };

  render() {
    return (
      <div className="dropdown-container">
        <label align="center" style={{ width: `100%` }}>
          Preptest:
        </label>
        <select className="form-control" value={this.state.titleIndex} onChange={this.handleChange}>
          {this.renderOptions()}
        </select>
      </div>
    );
  }
}
