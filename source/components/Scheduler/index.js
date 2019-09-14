// Core
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';
//import { tasks } from './tasks';

// Components
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';
import Spinner from '../Spinner';

//Actions
import { tasksActions } from '../../redux/tasks/actions';

const mapStateToProps = state => {
  return {
  	tasks: state.tasksReducer
  };
};

const mapDispatchToProps =  {
        fetchTasksAsync: tasksActions.fetchTasksAsync,
        createTaskAsync: tasksActions.createTaskAsync
};

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Scheduler extends Component {
	taskDescription = null;

	createTask = (event, taskDescription) => {
		event.preventDefault();
		this.props.createTaskAsync(taskDescription);
	}

  componentDidMount() {
    this.props.fetchTasksAsync();
  }

    render () {
        const todoList = this.props.tasks.map((task) => (
            <Task
                key = { task.get('id') }
                id = { task.get('id') }
                message = {task.get('message')}
                created = {task.get('created')}
                completed = {task.get('completed')}
                favorite = {task.get('favorite')}
            />
        ));

        return (
            <section className = { Styles.scheduler }>
            		<Spinner isSpinning={true} />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                ref={(node) => {this.taskDescription = node;}}
                            />
                            <button
                           		onClick = {(event) => this.createTask(event, this.taskDescription.value)}
                            >
                            	Добавить задачу
                            </button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                            	<FlipMove>
                            		{todoList}
                            	</FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox checked color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
