import { put, apply } from 'redux-saga/effects';
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* fillTasks() {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.fetch);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    yield put(tasksActions.fillTasks(data));
  } catch (error) {
    yield put(uiActions.emitError(error, 'fillTasks worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}