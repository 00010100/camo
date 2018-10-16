import React, { Component } from 'react';

import Button from '../Button';
import './ListItem.css';

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      answers: props.answers,
    };
  }

  componentDidMount() {
    console.log('ListItem', this.props);
  }

  handleChange = (index) => (evt) => {
    const val = evt.target.value.toUpperCase();
    let value = '';

    if (val !== '') {
      const other = /^.(.*)/.exec(val)[1];
      value = val.replace(other, '');

      if (this.refs[index + 1] !== undefined) {
        this.refs[index + 1].focus();
      }
    }

    const newAnswers = this.state.answers.map((item, idx) => {
      if (index !== idx) return item;

      return { ...item, value };
    });

    this.setState({ answers: newAnswers });
  };

  renderQuestions = () => {
    const { list } = this.props;
    const { answers } = this.state;

    return list.map((item, index) => {
      return (
        <li className="list-group-item" key={index}>
          <span className="list-item-box">
            <span>{index + 1}</span>
            <input
              ref={index}
              onKeyPress={this.handleKeyPress}
              onPaste={this.handlePaste}
              className="form-control"
              type="text"
              value={answers[index].value}
              onChange={this.handleChange(index)}
            />
          </span>
        </li>
      );
    });
  };

  handleKeyPress = (evt) => {
    if (
      evt.key !== 'a' &&
      evt.key !== 'b' &&
      evt.key !== 'c' &&
      evt.key !== 'd' &&
      evt.key !== 'e'
    ) {
      evt.preventDefault();
    }
  };

  handlePaste = (evt) => {
    evt.preventDefault();
  };

  toNextScreen = () => {
    const { nextStep, callback } = this.props;
    const { answers } = this.state;

    callback(answers)
    nextStep();
  };

  render() {
    const { answers } = this.state;
    
    const isDisabled = answers.every(({ value }) => value !== '');

    return (
      <React.Fragment>
        <ul className="item-list list-group">{this.renderQuestions()}</ul>
        <Button
          label="Submit"
          toNextScreen={this.toNextScreen}
          disabled={!isDisabled}
        />
      </React.Fragment>
    );
  }
}
