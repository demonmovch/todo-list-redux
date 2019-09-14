import { all, call } from 'redux-saga/effects';
import { watchTasks } from '../redux/tasks/saga/watchers';

export function* rootSaga() {
  yield all([call(watchTasks)]);
}