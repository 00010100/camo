import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FirstScreen from '../FirstScreen';
import ListItem from '../ListItem';
import FourthScreen from '../FourthScreen';
import { getTitles, getSections } from '../../selectors';

import './App.css';

class App extends Component {
  static propTypes = {
    titles: PropTypes.objectOf(PropTypes.string).isRequired,
    sections: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  state = {
    activeStep: 0,
  };

  nextStep = () => {
    this.setState(({ activeStep }) => ({
      activeStep: activeStep + 1,
    }));
  };

  getStepContent = (step) => {
    const { titles, sections } = this.props;
    const { activeStep } = this.state;

    switch (step) {
    case 0:
      return <FirstScreen titles={titles} sections={sections} nextStep={this.nextStep} />;
    case 1:
      return <ListItem key={activeStep} activeStep={activeStep} nextStep={this.nextStep} />;
    case 2:
      return <ListItem key={activeStep} activeStep={activeStep} nextStep={this.nextStep} />;
    case 3:
      return <FourthScreen />;
    default:
      throw new Error('Unknown step');
    }
  };

  render() {
    return <div>{this.getStepContent(this.state.activeStep)}</div>;
  }
}

const mapStateToProps = (state) => ({
  titles: getTitles(state),
  sections: getSections(state),
});

export default connect(
  mapStateToProps,
  null,
)(App);
