import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Button from '../Button';
import './ListItem.css';
import Helpers from '../../helpers';

export default class ListItem extends Component {
  helpers = new Helpers();
  
  static propTypes = {
    list: PropTypes.objectOf(PropTypes.string).isRequired,
    nextStep: PropTypes.func.isRequired,
    getAnswers: PropTypes.func.isRequired,
    getResults: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      answers: this.createState(props.list)
    };
  }

  createState = (obj) => {
    for (let i in obj) {
      obj[i] = { value: '' };
    }

    return obj;
  };

  componentDidMount() {
    const refIndex = Object.keys(this.refs).map((k, i, arr) => arr[i])[0];

    this.refs[refIndex].focus();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextState.answers, this.state.answers)) {
      return false;
    }

    return true;
  }

  handleFocus = (evt) => {
    evt.target.select();
  };

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

    const answers = { ...this.state.answers, [index]: { value } };

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
              onFocus={this.handleFocus}
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

    if (evt.key === 'Enter') {
      const isDisabled = _.every(this.state.answers, ({ value }) => value !== '');

      isDisabled && this.toNextScreen();
    }
  };

  handlePaste = (evt) => {
    evt.preventDefault();
  };

  toNextScreen = () => {
    const { nextStep, getAnswers, getResults } = this.props;
    const { answers } = this.state;

    const filterAnswers = this.helpers.filterAnswers(answers);

    getAnswers(filterAnswers);
    getResults(filterAnswers);
    nextStep();
  };

  render() {
    const { answers } = this.state;
    const isDisabled = _.every(answers, ({ value }) => value !== '');

    return (
      <div className="jumbotron">
        <div className="title-box">
          <h2 align="center" className="subtitle">
            {`Enter your ${'num'} pass answers here:`}
          </h2>
          <small align="center">You can enter only: A, B, C, D, E</small>
        </div>
        <ul className="item-list list-group">{this.renderQuestions()}</ul>
        <Button label="Submit" callback={this.toNextScreen} disabled={!isDisabled} />
      </div>
    );
  }
}
