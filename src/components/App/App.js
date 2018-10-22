import React, { Component } from 'react';
import _ from 'lodash';

import mockData from '../../mock';
import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';
import ThirdScreen from '../ThirdScreen';
import FourthScreen from '../FourthScreen';
import Helpers from '../../helpers';
import './App.css';

export default class App extends Component {
  helpers = new Helpers();

  state = {
    activeStep: 0,
    indexes: {
      titleIndex: 0,
      sectionIndex: 0,
    },
    answers: {},
    results: {},
  };

  nextStep = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
    }));
  };

  getIndexes = (indexes) => {
    this.setState({ indexes });
  };

  getAnswers = (answers) => {
    this.setState({ answers });
  };

  getResults = (answers) => {
    const { indexes, activeStep } = this.state;
    const { missed, getListWrong, getListMatch, getWillDecoy } = this.helpers;

    const missCount = missed(mockData, indexes, answers);
    const listWrong = getListWrong(mockData, indexes, answers);
    const listMatch = getListMatch(mockData, indexes, answers);
    const listDecoys = getWillDecoy(mockData, indexes, answers);

    const res = _.cloneDeep(this.state.results);
    const results = { ...res, [activeStep]: { missCount, listWrong, listMatch, listDecoys } };

    this.setState({ results });
  };

  getStepContent = (step) => {
    const { algorithm, renderQuestions } = this.helpers;
    const { indexes, results, answers } = this.state;

    const questions = renderQuestions(mockData, indexes);
    const camoQuestions = algorithm(mockData, indexes, answers);

    switch (step) {
    case 0:
      return (
        <FirstScreen data={mockData} nextStep={this.nextStep} getIndexes={this.getIndexes} />
      );
    case 1:
      return (
        <SecondScreen
          questions={questions}
          nextStep={this.nextStep}
          getAnswers={this.getAnswers}
          getResults={this.getResults}
        />
      );
    case 2:
      return (
        <ThirdScreen
          questions={camoQuestions}
          nextStep={this.nextStep}
          getAnswers={this.getAnswers}
          getResults={this.getResults}
        />
      );
    case 3:
      return <FourthScreen results={results} />;
    default:
      throw new Error('Unknown step');
    }
  };

  render() {
    const { activeStep } = this.state;

    return <div>{this.getStepContent(activeStep)}</div>;
  }
}
