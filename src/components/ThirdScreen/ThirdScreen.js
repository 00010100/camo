import React, { Component } from 'react';

import ItemList from '../ListItem';
import './ThirdScreen.css';
import Helpers from '../../helpers';

export default class ThirdScreen extends Component {
  helpers = new Helpers();

  createState = (obj) => {
    for (let i in obj) {
      obj[i] = { value: '' };
    }
    return obj;
  };

  render() {
    const { questions, nextStep, getAnswers, getResults } = this.props;

    return (
      <div className="jumbotron">
        <h1 align="center">Enter your second pass answers here:</h1>
        <ItemList
          answers={this.createState(questions)}
          nextStep={nextStep}
          callback={getAnswers}
          getResults={getResults}
        />
      </div>
    );
  }
}