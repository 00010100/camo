import React, { Component } from 'react';
import _ from 'lodash';

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

  handleChange = (index) => (evt) => {
    const val = evt.target.value.toUpperCase();
    let value = '';

    if (val !== '') {
      const other = /^.(.*)/.exec(val)[1];
      value = val.replace(other, '');

      const refs = Object.keys(this.refs).map((k, i, arr) => arr[i]);

      _.map(refs, (el, i) => {
        if (parseInt(el) === index) {
          if (refs[i + 1] !== undefined) {
            this.refs[refs[i + 1]].focus();
          }
        }
      });
    }

    const obj = _.cloneDeep(this.state.answers);

    const answers = Object.assign({}, obj, { [index]: { value } });

    this.setState({ answers });
  };

  renderQuestions = () => {
    const { answers } = this.state;

    return Object.keys(answers).map((key) => {
      const idx = parseInt(key);

      return (
        <li className="list-group-item" key={idx}>
          <span className="list-item-box">
            <span>{`${parseInt(idx) + 1}`}</span>
            <input
              ref={idx}
              onKeyPress={this.handleKeyPress}
              onPaste={this.handlePaste}
              className="form-control"
              type="text"
              value={answers[idx].value}
              onChange={this.handleChange(idx)}
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
    const { nextStep, callback, getResults } = this.props;
    const { answers } = this.state;

    callback(answers);
    getResults(answers);
    nextStep();
  };

  render() {
    const { answers } = this.state;

    const isDisabled = _.every(answers, ({ value }) => value !== '');

    return (
      <React.Fragment>
        <ul className="item-list list-group">{this.renderQuestions()}</ul>
        <Button label="Submit" callback={this.toNextScreen} disabled={!isDisabled} />
      </React.Fragment>
    );
  }
}
