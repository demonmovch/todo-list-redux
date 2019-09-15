import { fromJS, List } from 'immutable';
import { types } from './types';

const initialState = List();

export const tasksReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case types.FILL_TASKS:
    	console.log(payload);
      return fromJS(payload);

    case types.CREATE_TASK:
      return state.splice(0, 0, fromJS(payload));

    case types.REMOVE_TASK:
      return state.filter((item) => item.get('id') !== payload);

		case types.UPDATE_TASK:
      return state.setIn([state.findIndex((task) => task.get('id') === payload.id),'favorite'],
				payload.favorite
      );

    default:
      return state;
  }
};