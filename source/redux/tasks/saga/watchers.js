import { takeEvery, all, call } from 'redux-saga/effects';
import { types } from '../types';
import { fillTasks } from './workers/fillTasks';
import { createTask } from './workers/createTask';
import { removeTask } from './workers/removeTask';
import { updateTask } from './workers/updateTask';


function* watchUpdateTask() {
  yield takeEvery(types.UPDATE_TASK_ASYNC, updateTask);
}

function* watchRemoveTask() {
  yield takeEvery(types.REMOVE_TASK_ASYNC, removeTask);
}

function* watchCreateTask() {
  yield takeEvery(types.CREATE_TASK_ASYNC, createTask);
}

function* watchFillTasks() {
  yield takeEvery(types.FETCH_TASKS_ASYNC, fillTasks);
}

export function* watchTasks() {
  yield all([call(watchCreateTask), call(watchFillTasks), call(watchRemoveTask), call(watchUpdateTask)]);
}