import { types } from './types';

export const tasksActions = {
  fillTasks: tasks => {
    return {
      type: types.FILL_TASKS,
      payload: tasks,
    };
  },
  fetchTasksAsync: () => {
    return {
      type: types.FETCH_TASKS_ASYNC,
    };
  },
  createTask: taskDescription => {
    return {
      type: types.CREATE_TASK,
      payload: taskDescription,
    };
  },
  createTaskAsync: taskDescription => {
    return {
      type: types.CREATE_TASK_ASYNC,
      payload: taskDescription,
    };
  },
  removeTask: taskID => {
    return {
      type: types.REMOVE_TASK,
      payload: taskID,
    };
  },
  removeTaskAsync: taskID => {
    return {
      type: types.REMOVE_TASK_ASYNC,
      payload: taskID,
    };
  },
  updateTask: task => {
    return {
      type: types.UPDATE_TASK,
      payload: task,
    };
  },
  updateTaskAsync: task => {
    return {
      type: types.UPDATE_TASK_ASYNC,
      payload: task,
    };
  },
};