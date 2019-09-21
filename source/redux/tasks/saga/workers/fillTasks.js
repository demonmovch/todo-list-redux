import { put, apply } from 'redux-saga/effects';
import { api } from '../../../../REST';
import { tasksActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { sortTasks } from '../../../../instruments/helpers';

export function* fillTasks() {
  try {
    yield put(uiActions.startFetching());

    const response = yield apply(api, api.fetch);
    const { data, message } = yield apply(response, response.json);

    if (response.status !== 200) {
      throw new Error(message);
    }

    /* сортируем задачи*/
    const sortedTasks = sortTasks(data);

    /* если у всех задач состояние completed со значением то ставим галочку
     на чекбокс «Все задачи выполнены» */
    if (sortedTasks.every(task => task.completed === true)) {
      yield put(uiActions.checkCheckbox());
    }

    /* нааполняем todo лист задачами */
    yield put(tasksActions.fillTasks(sortedTasks));
  } catch (error) {
    yield put(uiActions.emitError(error, 'fillTasks worker'));
  } finally {
    yield put(uiActions.stopFetching());
  }
}
