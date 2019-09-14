import { combineReducers } from 'redux';
import { uiReducer } from '../redux/ui/reducer';
import { tasksReducer } from '../redux/tasks/reducer';

export const rootReducer = combineReducers({
  uiReducer,
  tasksReducer
});