import { put, apply } from 'redux-saga/effects';
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { store } from '../../../../init/store';

export function* updateTaskCompleted({ payload: task }) {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.update, [task]);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    /* обновляем состояние completed у соответствующей задачи */
    yield put(tasksActions.updateTaskCompleted(data[0]));

    /* если убрали галочки с чекбокса задачи то соответственно
    убираем галочку с чекбокса «Все задачи выполнены» */
    if (!data[0].completed) {
      yield put(uiActions.uncheckCheckbox());
    } else {
      /* если поставили галочку на чекбоксе задачи то проверяем все ли задачи 
      отмечены чтобы поставить галочку на чекбоксе «Все задачи выполнены» */
      const { tasksReducer } = store.getState();
      if (tasksReducer.every(task => task.get('completed') === true)) {
        yield put(uiActions.checkCheckbox());
      }
    }
  } catch (error) {
    yield put(uiActions.emitError(error, 'updateTaskCompleted worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
