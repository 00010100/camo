import React, { Component } from 'react';

import ItemList from '../ListItem';
import './ThirdScreen.css';

export default class ThirdScreen extends Component {
  createState = (list) => list.map(() => ({ value: '' }));

  render() {
    const { questions, nextStep, getAnswers } = this.props;
    return (
      <div className="jumbotron">
        <h1 align="center">
         Enter your second pass answers here:
        </h1>
        <ItemList
          list={questions}
          answers={this.createState(questions)}
          nextStep={nextStep}
          callback={getAnswers}
        />
      </div>
    );
  }
}
