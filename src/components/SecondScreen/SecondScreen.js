import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import './SecondScreen.css';

export default class SecondScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      answer: this.createState(props.questions),
    };
  }

  createState = (questions) => questions.map(() => ({ value: '' }));

  handleChange = (index) => (evt) => {
    const value = evt.target.value.toUpperCase();

    if (value.length === 1) {
      this.refs[index + 1].focus();
    }

    const newAnswer = this.state.answer.map((item, idx) => {
      if (index !== idx) return item;

      return { ...item, value };
    });

    this.setState({ answer: newAnswer });
  };

  handleKeyPress = (evt) => {
    if (evt.key !== 'a' && evt.key !== 'b' && evt.key !== 'c' && evt.key !== 'd') {
      evt.preventDefault();
    }
  };

  handlePaste = (evt) => {
    evt.preventDefault();
  };

  renderQuestions = () => {
    const { questions } = this.props;
    const { answer } = this.state;

    return questions.map((item, index) => {
      return (
        <li className="list-group-item" key={item}>
          <span>{item.substr(0, item.length - 2)}</span>
          <input
            ref={index}
            onKeyPress={this.handleKeyPress}
            onPaste={this.handlePaste}
            className="form-control"
            type="text"
            value={answer[index].value}
            onChange={this.handleChange(index)}
          />
        </li>
      );
    });
  };

  render() {
    const { nextStep } = this.props;

    console.log(this.state.answer);

    return (
      <div>
        <ul className="item-list list-group">{this.renderQuestions()}</ul>
        <Button label="Submit" nextStep={nextStep} />
      </div>
    );
  }
}

SecondScreen.propTypes = {
  // questions: PropTypes.objectOf(PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))).isRequired,
  // nextStep: PropTypes.func.isRequired,
  // indexes: PropTypes.objectOf(PropTypes.number).isRequired,
};
