import { createReducer } from 'redux-act';
import { getIdxs } from '../actions';

import data from '../data/data.json';

const initialState = {
  ...data,
  indexes: {
    titleIndex: 0,
    sectionIndex: 0,
  },
};

export default createReducer(
  {
    [getIdxs]: (state, payload) => ({
      ...state,
      indexes: {
        ...state.indexes,
        titleIndex: payload.titleIndex,
        sectionIndex: payload.sectionIndex,
      },
    }),
  },
  initialState
);
