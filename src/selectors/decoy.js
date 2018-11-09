import { createSelector } from 'reselect';
import _ from 'lodash';

import { filterData, getWrongAnswersLength } from '../selectors';

export const getRawDecoys = (state) => filterData(state).decoys;

export const getDecoys = createSelector([getRawDecoys, getWrongAnswersLength], (decoys, count) => {
  const decoy = decoys[count];

  if (!_.isEqual(count, undefined)) {
    if (decoy !== '0') {
      const minMax = decoy.split('-');
      return _.random(minMax[0], minMax[1]);
    }

    return parseInt(decoy);
  }
});

export const getCamouflageCount = createSelector(
  [getDecoys, getWrongAnswersLength],
  (decoys, count) => _.sum([decoys, count]),
);
