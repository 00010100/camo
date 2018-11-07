import { createSelector } from 'reselect';

import { filterData } from './data';

const getRawSections = (state) => filterData(state).sections;

export const getSections = createSelector([getRawSections], (sections) => sections);
