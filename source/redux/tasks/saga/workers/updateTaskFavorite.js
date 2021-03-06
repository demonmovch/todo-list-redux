import { put, apply } from 'redux-saga/effects';
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* updateTaskFavorite({ payload: task }) {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.update, [task]);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    /* обновляем состояние favorite у соответствующей задачи */
    yield put(tasksActions.updateTaskFavorite(data[0]));
  } catch (error) {
    yield put(uiActions.emitError(error, 'updateTaskFavorite worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
