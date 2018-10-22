import React from 'react';
import PropTypes from 'prop-types';

import ItemList from '../ListItem';
import './ThirdScreen.css';

const ThirdScreen = ({ questions, nextStep, getAnswers, getResults }) => {
  const createState = (obj) => {
    for (let i in obj) {
      obj[i] = { value: '' };
    }
    return obj;
  };

  return (
    <div className="jumbotron">
      <h1 align="center">Enter your second pass answers here:</h1>
      <ItemList
        answers={createState(questions)}
        nextStep={nextStep}
        callback={getAnswers}
        getResults={getResults}
      />
    </div>
  );
}

ThirdScreen.propTypes = {
  questions: PropTypes.objectOf(PropTypes.string).isRequired,
  nextStep: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired,
};

export default ThirdScreen;
