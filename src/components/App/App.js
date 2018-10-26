import React, { Component } from 'react';

import GetDataHOC from '../HOC/GetDataHOC';
import FirstScreen from '../FirstScreen';
import ListItem from '../ListItem';
import FourthScreen from '../FourthScreen';
import Helpers from '../../helpers';
import './App.css';

class App extends Component {
  helpers = new Helpers();

  state = {
    activeStep: 0,
    indexes: null,
    answers: {},
    results: {}
  };

  nextStep = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1
    }));
  };

  getIndexes = (indexes) => {
    this.setState({ indexes });
  };

  getAnswers = (answers) => {
    this.setState({ answers });
  };

  getResults = (answers) => {
    const { data } = this.props;
    const { indexes, activeStep } = this.state;

    const res = this.helpers.getResults(data, indexes, answers);

    const results = { ...this.state.results, [activeStep]: { ...res } };
    this.setState({ results });
  };

  getStepContent = (step) => {
    const { algorithm, renderQuestions } = this.helpers;
    const { indexes, results, answers } = this.state;
    const { data } = this.props;

    switch (step) {
    case 0:
      return (
        <FirstScreen
          titles={data.titles}
          sections={data.sections}
          nextStep={this.nextStep}
          getIndexes={this.getIndexes}
        />
      );
    case 1: {
      const questions = renderQuestions(data, indexes);

      return (
        <ListItem 
          key="questions"
          num="first"
          list={questions}
          nextStep={this.nextStep}
          getAnswers={this.getAnswers}
          getResults={this.getResults}
        />
      );
    }
    case 2: {
      const camoQuestions = algorithm(data, indexes, answers);

      return (
        <ListItem 
          key="camoQuestions"
          num="second"
          list={camoQuestions}
          nextStep={this.nextStep}
          getAnswers={this.getAnswers}
          getResults={this.getResults}
        />
      );
    }
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

export default GetDataHOC(App);
