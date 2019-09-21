import { types } from './types';

export const uiActions = {
  startFetching: () => {
    return {
      type: types.START_FETCHING,
    };
  },
  stopFetching: () => {
    return {
      type: types.STOP_FETCHING,
    };
  },
  emitError: (error, meta = null) => {
    return {
      type: types.EMIT_ERROR,
      payload: error,
      error: true,
      meta,
    };
  },
  updateTasksFilter: filterValue => {
    return {
      type: types.UPDATE_TASKS_FILTER,
      payload: filterValue,
    };
  },
  checkCheckbox: () => {
    return {
      type: types.CHECK_CHECKBOX,
    };
  },
  uncheckCheckbox: () => {
    return {
      type: types.UNCHECK_CHECKBOX,
    };
  },
};
