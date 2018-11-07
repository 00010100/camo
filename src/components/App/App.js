import React, { Component } from 'react';
import { connect } from 'react-redux';

import FirstScreen from '../FirstScreen';
import ListItem from '../ListItem';
import FourthScreen from '../FourthScreen';
import Helpers from '../../helpers';
import { setData } from '../../actions';
import {
  getRightAnswers,
  getTitles,
  getSections,
  getTitleAndSectionIndexes,
  getCamouflageQuestions,
  getQuestions,
  getAnswersSelector,
  getDecoy,
  getMyAnswers,
} from '../../selectors';

import './App.css';

class App extends Component {
  helpers = new Helpers();

  state = {
    activeStep: 0,
    // answers: {},
    results: {},
    decoy: 0,
  };

  componentDidMount() {
    console.log('componentDidMount APP  ', this.props);
  }

  nextStep = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
    }));
  };

  // getAnswers = (answers) => {
  //   this.setState({ answers });
  // };

  // getResults = (answers) => {
  //   const { data } = this.props;
  //   const { indexes, activeStep } = this.state;
  //   const { getDecoy, renderRightAnswers, getResults } = this.helpers;

  //   const decoy = getDecoy(data, indexes, answers);
  //   const res = getResults(data, indexes, answers, decoy);
  //   const rightAnswers = renderRightAnswers(data, indexes);

  //   const results = { ...this.state.results, [activeStep]: { answers, ...res }, rightAnswers };
  //   this.setState({ results, decoy });
  // };

  getStepContent = (step) => {
    // const { algorithm } = this.helpers;
    const { indexes, results, answers, decoy } = this.state;
    const { data, titles, sections, questions, camouflageQuestions } = this.props;

    console.log('camouflageQuestions', camouflageQuestions)

    switch (step) {
      case 0:
        return <FirstScreen titles={titles} sections={sections} nextStep={this.nextStep} />;
      case 1: {
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
        // const camoQuestions = algorithm(data, indexes, answers, decoy);

        return (
          <ListItem
            key="camoQuestions"
            num="second"
            list={camouflageQuestions}
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

const mapStateToProps = (state) => ({
  // rightAnswers: getRightAnswers(state),
  titles: getTitles(state),
  sections: getSections(state),
  indexes: getTitleAndSectionIndexes(state),
  questions: getQuestions(state),
  // camouflageQuestions: getCamouflageQuestions(state),
  answers: getMyAnswers(state),
  decoy: getDecoy(state),
});

export default connect(
  mapStateToProps,
  { setData }
)(App);
