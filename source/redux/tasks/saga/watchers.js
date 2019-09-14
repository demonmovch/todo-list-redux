import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import { fillTasks } from './workers/fillTasks';
import { createTask } from './workers/createTask';

function* watchCreateTask() {
  yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchFillTasks() {
  yield takeEvery(types.FETCH_TASKS_ASYNC, fillTasks);
}

export function* watchTasks() {
  yield all([call(watchCreateTask), call(watchFillTasks)]);
}