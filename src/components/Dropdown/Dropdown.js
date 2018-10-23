import React, { Component } from 'react';

import './Dropdown.css';

export default class Dropdown extends Component {
  state = {
    titleIndex: 0
  };

  handleChange = (event) => {
    this.setState({ titleIndex: event.target.value });
    this.props.choiceTitle(event.target.value);
  };

  renderOptions = () =>
    this.props.titles.map((title, index) => (
      <option key={index} value={index}>
        {title}
      </option>
    ));

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
