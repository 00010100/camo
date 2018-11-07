import { createSelector } from 'reselect';
import _ from 'lodash';

import { filterData, getTitleAndSectionIndexes, getRightAnswers, getMyAnswers, getWrongAnswersLength } from '../selectors';

const getIdxes = (state) => getTitleAndSectionIndexes(state);
const getRawQuestions = (state) => filterData(state).questions;

const getRightAnswersSelector = (state) => getRightAnswers(state);
const getMyAnswersSelector = (state) => getMyAnswers(state);

const as = (state) => getWrongAnswersLength(state);

export const getFilteredQuestions = createSelector([getRawQuestions, getIdxes], (questions, indexes) => {
  const questionsRaw = questions[indexes.sectionIndex][indexes.titleIndex];

  return _.toPlainObject(questionsRaw.split(/\s+(?=\d)/));
});

export const getQuestions = createSelector([getRawQuestions, getIdxes], (questions, indexes) => {
  // const questionsObj = filteredQuestions(questions, indexes);
  const questionsRaw = questions[indexes.sectionIndex][indexes.titleIndex];

  const questionsObj = _.toPlainObject(questionsRaw.split(/\s+(?=\d)/));

  const result = {};

  for (let key in questionsObj) {
    result[key] = '';
  }

  return result;
});

export const getDecoy = createSelector([as], (wrongLength) => {
  console.log('wrongLength', wrongLength)
})

// export const getDecoy = createSelector([getRawQuestions, getAnswers, getIdxes, getRightAnswers], (questions, answers, indexes, rightAnswers) => {
//   // const questionsObj = filteredQuestions(questions, indexes);
//   const questionsRaw = questions[indexes.sectionIndex][indexes.titleIndex];

//   const questionsObj = _.toPlainObject(questionsRaw.split(/\s+(?=\d)/));
//   console.log('questionsObj', questionsObj)
//   console.log('answers', answers)
//   console.log('indexes', indexes)
//   console.log('rightAnswers', rightAnswers)

//   // getDecoy = (data, indexes, answers) => {
//   //   const rightAnswers = this.renderRightAnswers(data, indexes);
//   //   const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
//   //   const decoy = this._getDecoy(data, countWrongAnswers);

//   //   return decoy;
//   // };
// })

// export const getCamouflageQuestions = createSelector([getRawQuestions, getAnswers, getIdxes], (questions, answers, indexes) => {
//   console.log('questions', questions)
//   console.log('answers', answers)
//   console.log('indexes', indexes)
// })
