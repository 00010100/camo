import React, { Component } from 'react';

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
    missedQuestions: {},
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

  getStepContent = (step) => {
    const { algorithm, renderQuestions, missed } = this.helpers;
    const { indexes } = this.state;

    const questions = renderQuestions(mockData, indexes);
    const camoQuestions = algorithm(mockData, indexes, this.state.answers);
    const missedQuestions = missed(mockData, indexes, this.state.answers);

    // console.log('camoQuestions', camoQuestions)

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
            questions={camoQuestions}
            nextStep={this.nextStep}
            getAnswers={this.getAnswers}
          />
        );
      case 3:
        return (
          <FourthScreen />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  render() {
    const { activeStep } = this.state;

    return <div>{this.getStepContent(activeStep)}</div>;
  }
}
