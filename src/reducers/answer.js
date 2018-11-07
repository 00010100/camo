import { createReducer } from 'redux-act';
import { setMyAnswers } from '../actions';

const initialState = {
  answers: null,
};

export default createReducer(
  {
    [setMyAnswers]: (state, payload) => ({
      ...state,
      answers: payload,
    }),
  },
  initialState
);
