import { createSelector } from 'reselect';
import _ from 'lodash';

import {
  filterData,
  getTitleAndSectionIndexes,
  getStatisticAnswers,
  getCamouflageCount,
} from '../selectors';

export const getRawQuestions = (state) => filterData(state).questions;

export const getFilteredQuestions = createSelector(
  [getRawQuestions, getTitleAndSectionIndexes],
  (questions, indexes) => {
    const questionsRaw = questions[indexes.sectionIndex][indexes.titleIndex];

    return _.toPlainObject(questionsRaw.split(/\s+(?=\d)/));
  },
);

const clearValue = (obj) => {
  const result = {};

  for (let key in obj) {
    result[key] = { value: '' };
  }

  return result;
};

export const getQuestions = createSelector([getFilteredQuestions], (questions) =>
  clearValue(questions),
);

export const getCamouflageQuestions = createSelector(
  [getStatisticAnswers, getCamouflageCount],
  (answers, camouflageCount) => {
    if (answers) {
      const camouflageQuestions = _(answers)
        .map((el, index) => [index, el])
        .orderBy([(el) => el[1]], ['desc'])
        .slice([0], [camouflageCount])
        .fromPairs()
        .value();


      return clearValue(camouflageQuestions);
    }
  },
);
