import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import './SecondScreen.css';

const SecondScreen = ({ questions, nextStep, getAnswers, getResults }) => {
  const createState = (obj) => {
    for (let i in obj) {
      obj[i] = {value: ''}
    }
    return obj;
  };

  return (
    <div className="jumbotron">
      <ListItem
        answers={createState(questions)}
        nextStep={nextStep}
        callback={getAnswers}
        getResults={getResults}
      />
    </div>
  );
}

SecondScreen.propTypes = {
  questions: PropTypes.objectOf(PropTypes.string).isRequired,
  nextStep: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired,
};

export default SecondScreen;