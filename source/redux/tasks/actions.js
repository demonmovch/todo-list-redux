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
  updateTaskFavorite: task => {
    return {
      type: types.UPDATE_TASK_FAVORITE,
      payload: task,
    };
  },
  updateTaskFavoriteAsync: task => {
    return {
      type: types.UPDATE_TASK_FAVORITE_ASYNC,
      payload: task,
    };
  },
  updateTaskCompleted: task => {
    return {
      type: types.UPDATE_TASK_COMPLETED,
      payload: task,
    };
  },
  updateTaskCompletedAsync: task => {
    return {
      type: types.UPDATE_TASK_COMPLETED_ASYNC,
      payload: task,
    };
  },
  updateAllTasksCompleted: tasks => {
    return {
      type: types.UPDATE_ALL_TASKS_COMPLETED,
      payload: tasks,
    };
  },
  updateAllTasksCompletedAsync: tasks => {
    return {
      type: types.UPDATE_ALL_TASKS_COMPLETED_ASYNC,
      payload: tasks,
    };
  },
};
