import { createReducer } from 'redux-act';
import { setQuestions } from '../actions';

const initialState = {
  questionsList: {},
};

export default createReducer(
  {
    [setQuestions]: (state, payload) => ({
      ...state,
      questionsList: { 1: '2', 2: '3' },
    }),
  },
  initialState
);
