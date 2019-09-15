import { types } from './types';

export const newTaskDescriptionActions = {
  updateNewTaskDescription: (newTaskDescription) => {
    return {
      type: types.NEW_TASK_DESCRIPTION_CHANGED,
      payload: newTaskDescription
    };
  },
  clearNewTaskDescription: () => {
    return {
      type: types.NEW_TASK_DESCRIPTION_CLEAR,
    };
  },
};