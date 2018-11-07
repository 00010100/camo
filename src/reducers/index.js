import { combineReducers } from 'redux';
import questions from './question';
import answers from './answer';
import data from './data';

const rootReducer = combineReducers({
  questions,
  data,
  answers,
});

export default rootReducer;