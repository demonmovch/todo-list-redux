import { Map } from 'immutable';
import { types } from './types';

const initialState = Map({
  isSpinning: false,
  isChecked: false,
  tasksFilter: '',
});

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCHING:
      return state.set('isSpinning', true);

    case types.STOP_FETCHING:
      return state.set('isSpinning', false);

    case types.UPDATE_TASKS_FILTER:
      return state.set('tasksFilter', action.payload);

    case types.CHECK_CHECKBOX:
      return state.set('isChecked', true);

    case types.UNCHECK_CHECKBOX:
      return state.set('isChecked', false);

    default:
      return state;
  }
};
