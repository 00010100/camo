import { createSelector } from 'reselect';

import { filterData } from './data';

const getRawTitles = (state) => filterData(state).titles;

export const getTitles = createSelector([getRawTitles], (titles) => titles);
