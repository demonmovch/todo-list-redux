import { fromJS, List } from 'immutable';
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILL_TASKS:
    	console.log(action.payload);
      return fromJS(action.payload);

    case types.CREATE_TASK:
      return state.splice(0, 0, fromJS(action.payload));

    default:
      return state;
  }
};