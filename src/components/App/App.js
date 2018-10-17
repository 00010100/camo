import React, { Component } from 'react';

import mockData from '../../mock';
import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';
import ThirdScreen from '../ThirdScreen';
import Helpers from '../../helpers';

export default class App extends Component {
  helpers = new Helpers();

  state = {
    activeStep: 0,
    indexes: {
      titleIndex: 0,
      sectionIndex: 0,
    },
    answers: [],
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

  asd = () => {
    const { indexes } = this.state;

    const ALGO = this.helpers.algorithm(mockData, indexes, this.state.answers);

    console.log('ALGO', ALGO)
  };

  getStepContent = (step) => {
    const { indexes } = this.state;
    const questions = this.helpers._renderQuestions(mockData, indexes);

    this.asd();

    switch (step) {
      case 0:
        return (
          <FirstScreen
            data={mockData}
            nextStep={this.nextStep}
            getIndexes={this.getIndexes}
          />
        );
      case 1:
        return (
          <SecondScreen
            questions={questions}
            nextStep={this.nextStep}
            getAnswers={this.getAnswers}
          />
        );
      case 2:
        return (
          <ThirdScreen
            questions={questions}
            nextStep={this.nextStep}
            getAnswers={this.getAnswers}
          />
        );
      case 3:
        return (
          <div />
          // <FourthScreen />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  render() {
    const { activeStep, answers, indexes } = this.state;

    return <div>{this.getStepContent(activeStep)}</div>;
  }
}
