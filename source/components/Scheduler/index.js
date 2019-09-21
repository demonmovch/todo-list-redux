// Core
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';
import { toJS } from 'immutable';

// Instruments
import Styles from './styles.m.css';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../Spinner';

//Actions
import { tasksActions } from '../../redux/tasks/actions';
import { newTaskDescriptionActions } from '../../redux/newTask/actions';
import { uiActions } from '../../redux/ui/actions';

const mapStateToProps = state => {
  return {
    tasks: state.tasksReducer,
    newTaskDescription: state.newTaskDescriptionReducer,
    tasksFilter: state.uiReducer.get('tasksFilter'),
    isChecked: state.uiReducer.get('isChecked'),
  };
};

const mapDispatchToProps = {
  fetchTasksAsync: tasksActions.fetchTasksAsync,
  createTaskAsync: tasksActions.createTaskAsync,
  removeTaskAsync: tasksActions.removeTaskAsync,
  updateTasksFilter: uiActions.updateTasksFilter,
  updateAllTasksCompletedAsync: tasksActions.updateAllTasksCompletedAsync,
  updateTaskFavoriteAsync: tasksActions.updateTaskFavoriteAsync,
  updateTaskCompletedAsync: tasksActions.updateTaskCompletedAsync,
  updateNewTaskDescription: newTaskDescriptionActions.updateNewTaskDescription,
  clearNewTaskDescription: newTaskDescriptionActions.clearNewTaskDescription,
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Scheduler extends Component {
  createTask = (event, taskDescription) => {
    event.preventDefault();
    if (this.props.newTaskDescription.trim() !== '') {
      this.props.createTaskAsync(taskDescription.trim());
      this.props.clearNewTaskDescription();
    }
  };

  clickHandler = event => {
    this.createTask(event, this.props.newTaskDescription);
  };

  keyPressHandler = event => {
    if (event.key === 'Enter') {
      this.createTask(event, this.props.newTaskDescription);
    }
  };

  /* обновляем текст в поле описания новой задачи */
  updateNewTaskDescription = event => {
    this.props.updateNewTaskDescription(event.target.value);
  };

  /* ставим состояние completed у всех задач у которых оно не стоит при 
     нажатии на чекбокс «Все задачи выполнены» */
  completeAllTasks = () => {
    if (!this.props.isChecked) {
      let notCompletedTasks = this.props.tasks.filter(task => task.get('completed') !== true);
      if (notCompletedTasks.length === 0) {
        return null;
      }

      notCompletedTasks = notCompletedTasks.toJS();
      notCompletedTasks = notCompletedTasks.map(item => {
        return { ...item, completed: true };
      });

      this.props.updateAllTasksCompletedAsync(notCompletedTasks);
    }
  };

  /* обновляем текст в поле поиска */
  updateTasksFilter = event => {
    this.props.updateTasksFilter(event.target.value.toLowerCase());
  };

  componentDidMount() {
    this.props.fetchTasksAsync();
  }

  render() {
    let tasksJSX;

    const allTasks = task => (
      <Task
        key={task.get('id')}
        id={task.get('id')}
        message={task.get('message')}
        created={task.get('created')}
        completed={task.get('completed')}
        favorite={task.get('favorite')}
        removeTaskAsync={this.props.removeTaskAsync}
        updateTaskFavoriteAsync={this.props.updateTaskFavoriteAsync}
        updateTaskCompletedAsync={this.props.updateTaskCompletedAsync}
      />
    );

    /* фильтруем задачи при вводе текста в поле поиска */
    if (!this.props.tasksFilter) {
      tasksJSX = this.props.tasks.map(allTasks);
    } else {
      let filteredTasks = this.props.tasks.filter(task =>
        task.get('message').includes(this.props.tasksFilter)
      );

      tasksJSX = filteredTasks.map(allTasks);
    }

    return (
      <section className={Styles.scheduler}>
        <Spinner isSpinning={true} />
        <main>
          <header>
            <h1>Планировщик задач</h1>
            <input
              placeholder='Поиск'
              type='search'
              onChange={this.updateTasksFilter}
              value={this.props.tasksFilter}
            />
          </header>
          <section>
            <form>
              <input
                className={Styles.createTask}
                maxLength={50}
                placeholder='Описание моей новой задачи'
                type='text'
                onKeyPress={this.keyPressHandler}
                onChange={this.updateNewTaskDescription}
                value={this.props.newTaskDescription}
              />
              <button onClick={this.clickHandler}>Добавить задачу</button>
            </form>
            <div className={Styles.overlay}>
              <ul>
                <FlipMove>{tasksJSX}</FlipMove>
              </ul>
            </div>
          </section>
          <footer>
            <Checkbox
              checked={this.props.isChecked}
              color1='#363636'
              color2='#fff'
              onClick={this.completeAllTasks}
            />
            <span className={Styles.completeAllTasks}>Все задачи выполнены</span>
          </footer>
        </main>
      </section>
    );
  }
}
