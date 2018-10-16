import React, { Component } from 'react';

import './SectionChoice.css';

export default class SectionChoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  handleRadio = (event) => {
    this.setState({ activeIndex: event.target.value });
    this.props.choiceSection(Number(event.target.value));
  };

  renderSection() {
    return this.props.sections.map((item, index) => {
      const isCurrent = Number(this.state.activeIndex) === index;
      const selected = isCurrent ? 'active' : '';

      return (
        <label className={`btn btn-info ${selected}`} key={item}>
          <input
            type="radio"
            name="options"
            onChange={this.handleRadio}
            value={index}
          />{' '}
          {index + 1}
        </label>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <p align="center">Section: </p>
        <div
          className="btn-group btn-group-toggle button-container"
          data-toggle="buttons"
        >
          {this.renderSection()}
        </div>
      </React.Fragment>
    );
  }
}
