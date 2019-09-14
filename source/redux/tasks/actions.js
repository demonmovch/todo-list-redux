import { types } from './types';

export const tasksActions = {
  fillTasks: tasks => {
    return {
      type: types.FILL_TASKS,
      payload: tasks,
    };
  },
  createTask: message => {
    return {
      type: types.CREATE_TASK,
      payload: message,
    };
  },
  fetchTasksAsync: () => {
    return {
      type: types.FETCH_TASKS_ASYNC,
    };
  },
  createTaskAsync: taskDescription => {
    return {
      type: types.CREATE_TASK_ASYNC,
      payload: taskDescription,
    };
  },
};