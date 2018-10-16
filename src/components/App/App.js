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
    const { renderTrueAnswers, answersToArray  } = this.helpers;
    const { indexes } = this.state;
    const trueAnwers = this.helpers.renderTrueAnswers(mockData, indexes);
    const stAnswers = this.helpers.answersToArray(this.state.answers);
    const allAnsw = this.helpers.getAllAnswers(trueAnwers, stAnswers);


    let arr = new Array(25);

    arr.fill(0, 0, arr.length);

    allAnsw.map((el, index) => {
      if (el === 'no') {

        console.log(arr[index])
        if (arr[index] < 1) {
          arr[index] += 1;
          arr[index + 1] += 0.5;
          console.log(arr[index])
        }
    
      }

      arr[index] += 0;
    })

    console.log(arr)
  };

  getStepContent = (step) => {
    const { indexes } = this.state;
    const questions = this.helpers.renderQuestions(mockData, indexes);
    const trueAnwers = this.helpers.renderTrueAnswers(mockData, indexes);
    const stAnswers = this.helpers.answersToArray(this.state.answers);

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
