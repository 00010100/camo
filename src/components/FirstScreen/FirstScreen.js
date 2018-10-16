import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import SectionChoice from '../SectionChoice';
import Button from '../Button';
import './FirstScreen.css';

export default class FirstScreen extends Component {
  state = {
    titleIndex: 0,
    sectionIndex: 0,
  };

  toNextScreen = () => {
    const { titleIndex, sectionIndex } = this.state;
    const { nextStep, getIndexes } = this.props;

    getIndexes({ titleIndex, sectionIndex });
    nextStep();
  };

  choiceTitle = (titleIndex) => {
    this.setState({ titleIndex });
  };

  choiceSection = (sectionIndex) => {
    this.setState({ sectionIndex });
  };

  render() {
    const {
      data: { titles, sections },
    } = this.props;

    return (
      <div className="jumbotron">
        <h1 align="center">Welcome to Camouflage</h1>
        <p className="lead" align="center">
          Which section would you like to review?
        </p>
        <hr className="my-4" />
        <Dropdown titles={titles} choiceTitle={this.choiceTitle} />
        <SectionChoice sections={sections} choiceSection={this.choiceSection} />
        <Button label="Submit" toNextScreen={this.toNextScreen} />
      </div>
    );
  }
}

FirstScreen.propTypes = {
  // nextStep: PropTypes.func.isRequired,
  // titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  // sections: PropTypes.arrayOf(PropTypes.string).isRequired,
};
