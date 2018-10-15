import React, { Component } from 'react';

import mockData from '../../mock';
import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';

export default class App extends Component {
  state = {
    activeStep: 0,
    indexes: {
      titleIndex: 0,
      sectionIndex: 0
    },
  };

  handleNext = (indexes) => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
      indexes
    }));
  };


  getStepContent = (step) => {
    const { indexes } = this.state;
    const questions = mockData.questions[indexes.titleIndex][indexes.sectionIndex];

    switch (step) {
      case 0:
        return <FirstScreen data={mockData} nextStep={this.handleNext} />;
      case 1:
        return (
          <SecondScreen
            nextStep={this.handleNext}
            questions={questions}
          />
        );
      case 2:
        return (
          <div />
          // <ThirdScreen nextStep={this.handleNext} />
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
    const { activeStep } = this.state;

    return (
      <div>
        {this.getStepContent(activeStep)}
      </div>
    );
  }
}
