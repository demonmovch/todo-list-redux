import { put, apply } from 'redux-saga/effects';
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';

export function* updateAllTasksCompleted({ payload: tasks }) {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.completeAllTasks, [tasks]);

    response.map(async response => {
      if (response.status !== 200) {
        throw new Error();
      }
    });

    /* ставим состояние completed у всех задач у которых оно не стоит при 
     нажатии на чекбокс «Все задачи выполнены» */
    yield put(tasksActions.updateAllTasksCompleted(tasks));

    /* ставим галочку на чекбокс «Все задачи выполнены» */
    yield put(uiActions.checkCheckbox());
  } catch (error) {
    yield put(uiActions.emitError(error, 'updateAllTasksCompleted worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
