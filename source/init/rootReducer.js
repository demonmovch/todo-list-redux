import { combineReducers } from 'redux';
import { uiReducer } from '../redux/ui/reducer';
import { tasksReducer } from '../redux/tasks/reducer';
import { newTaskDescriptionReducer } from '../redux/newTask/reducer';

export const rootReducer = combineReducers({
  uiReducer,
  tasksReducer,
  newTaskDescriptionReducer
});