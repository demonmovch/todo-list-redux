import { fromJS, List } from 'immutable';
import { types } from './types';
import { sortTasks } from '../../instruments/helpers';
let newTasks, sortedTasks;

const initialState = List();

export const tasksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILL_TASKS:
      return fromJS(payload);

    case types.CREATE_TASK:
      newTasks = state.splice(0, 0, fromJS(payload));
      sortedTasks = fromJS(sortTasks(newTasks));
      return sortedTasks;

    case types.REMOVE_TASK:
      return state.filter(item => item.get('id') !== payload);

    case types.UPDATE_TASK_FAVORITE:
      newTasks = state.setIn(
        [state.findIndex(task => task.get('id') === payload.id), 'favorite'],
        payload.favorite
      );
      sortedTasks = fromJS(sortTasks(newTasks));
      return sortedTasks;

    case types.UPDATE_TASK_COMPLETED:
      newTasks = state.setIn(
        [state.findIndex(task => task.get('id') === payload.id), 'completed'],
        payload.completed
      );
      sortedTasks = fromJS(sortTasks(newTasks));
      return sortedTasks;

    case types.UPDATE_ALL_TASKS_COMPLETED:
      return state.map(item => item.set('completed', true));

    default:
      return state;
  }
};
