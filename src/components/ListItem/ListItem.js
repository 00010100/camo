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
    getResults: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      answers: this.createState(props.list),
      listOfReview: this.listOfReview(props.list),
    };
  }

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

  createState = (obj) => {
    for (let i in obj) {
      obj[i] = { value: '' };
    }

    return obj;
  };

  listOfReview = () =>
    Object.keys(this.props.list)
      .map((el) => {
        return parseInt(el) + 1;
      })
      .join(', ');

  handleFocus = (evt) => {
    evt.target.select();
  };

  filterValue = (value) => {
    if (!value.match(/[abcde]/gi)) {
      return false;
    }

    return true;
  };

  handleChange = (index) => (evt) => {
    const val = evt.target.value.toUpperCase();
    let value = '';

    if (!this.filterValue(val)) {
      evt.preventDefault();
    } else {
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
    if (!evt.key.match(/[abcde]/gi)) {
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

  renderTitle = () => {
    if (this.props.num === 'first') {
      return (
        <React.Fragment>
          <h3 align="center" className="subtitle">
            Type in the answers for your section below.
          </h3>
          <small align="center">
            Remember, don’t check your answers against the answer key yet. You don’t want to spoil
            the camouflage!
          </small>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <h3 align="center" className="subtitle">
          Awesome. Here is your Camouflage Review:
        </h3>
        <p align="center" className="lead">
          {this.state.listOfReview}
        </p>

        <p>
          Reattempt all of the questions listed here. This list contains all your wrong answers and
          an unknown number of camouflaged correct answers acting as decoys.
        </p>
        <p>
          The unknown number of decoys will test your confidence in your correct answers, in
          addition to allowing you a fresh, unspoiled pass at your incorrect answers. This will
          allow a much more fruitful analysis of the causation behind your wrong answers.
        </p>
        <p>Type in your answers to your Camouflage Review below.</p>
      </React.Fragment>
    );
  };

  render() {
    const { answers } = this.state;
    const isDisabled = _.every(answers, ({ value }) => value !== '');

    const btnLabel =
      this.props.num === 'first' ? 'Generate Camo Review' : 'Generate Camo Review Results';

    return (
      <div className="jumbotron">
        <div className="title-box">{this.renderTitle()}</div>
        <ul className="item-list list-group">{this.renderQuestions()}</ul>
        <Button label={btnLabel} callback={this.toNextScreen} />
      </div>
    );
  }
}
