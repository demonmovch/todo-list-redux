import { types } from './types';

const initialState = '';

export const newTaskDescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_TASK_DESCRIPTION_CHANGED:
      return action.payload;

    case types.NEW_TASK_DESCRIPTION_CLEAR:
      return '';

    default:
      return state;
  }
};