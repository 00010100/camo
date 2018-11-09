import { createSelector } from 'reselect';
import _ from 'lodash';

export const getRawData = (state) => state.data.data;
export const getTitleAndSectionIndexes = (state) => state.data.indexes;

export const filterData = createSelector([getRawData], (data) => ({
  titles: _.toPlainObject(data[0]),
  decoys: _.toPlainObject(data[9]),
  sections: {
    0: data[1][0],
    1: data[3][0],
    2: data[5][0],
    3: data[7][0],
  },
  questions: {
    0: _.toPlainObject(data[2]),
    1: _.toPlainObject(data[4]),
    2: _.toPlainObject(data[6]),
    3: _.toPlainObject(data[8]),
  },
}));
