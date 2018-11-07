import { createSelector } from 'reselect';
import _ from 'lodash';

import { getFilteredQuestions } from '../selectors';

const getDefaultAnswers = (state) => getFilteredQuestions(state);
export const getMyAnswers = (state) => state.answers.answers;


export const getRightAnswers = createSelector([getDefaultAnswers], (defaultAnswers) => {
  console.log('defaultAnswers &*&*&*&*&*&*&', defaultAnswers)
  let rightAnswers = {};
  
  for (let key in defaultAnswers) {
    const el = defaultAnswers[key];
    rightAnswers[key] = el.substring(el.length - 1);
  }

  console.log('rightAnswers, rightAnswers', rightAnswers)
  
  return rightAnswers;
});

export const getWrongAnswersLength = ([getRightAnswers, getMyAnswers],
(rightAnswers, myAnswers) => {
  console.log('rightAnswers', rightAnswers)
  console.log('myAnswers',myAnswers )
  console.log('myAnswers2222',rightAnswers.answers.answers )

  // const ad = _.filter(rightAnswers, (el, index) => el !== myAnswers[index]);
  // console.log('=>>>>>>>>', ad)
});
