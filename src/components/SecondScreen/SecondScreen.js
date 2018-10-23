import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import './SecondScreen.css';

const SecondScreen = ({ questions, nextStep, getAnswers, getResults }) => {
  const createState = (obj) => {
    for (let i in obj) {
      obj[i] = { value: '' };
    }
    return obj;
  };

  return (
    <div className="jumbotron">
      <div className="title-box">
        <h2 align="center" className="subtitle">
          Enter your first pass answers here:
        </h2>
        <small align="center">You can enter only: A, B, C, D, E</small>
      </div>
      <ListItem
        answers={createState(questions)}
        nextStep={nextStep}
        callback={getAnswers}
        getResults={getResults}
      />
    </div>
  );
};

SecondScreen.propTypes = {
  questions: PropTypes.objectOf(PropTypes.string).isRequired,
  nextStep: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired
};

export default SecondScreen;
