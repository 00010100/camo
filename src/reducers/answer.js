import { createReducer } from 'redux-act';
import { setMyAnswers } from '../actions';

const initialState = {
  answers: null,
  forStatAnswers: null,
};

export default createReducer(
  {
    [setMyAnswers]: (state, payload) => ({
      ...state,
      answers: payload,
      forStatAnswers: {
        ...state.forStatAnswers,
        [payload.step]: payload.list,
      },
    }),
  },
  initialState,
);
