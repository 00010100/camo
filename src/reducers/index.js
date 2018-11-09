import { combineReducers } from 'redux';
import answers from './answer';
import data from './data';

const rootReducer = combineReducers({
  data,
  answers,
});

export default rootReducer;
