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
import { newTaskDescriptionActions } from '../../redux/newTask/actions';

const mapStateToProps = state => {
  return {
  	tasks: state.tasksReducer,
    newTaskDescription: state.newTaskDescriptionReducer
  };
};

const mapDispatchToProps =  {
        fetchTasksAsync: tasksActions.fetchTasksAsync,
        createTaskAsync: tasksActions.createTaskAsync,
        removeTaskAsync: tasksActions.removeTaskAsync,
        updateTaskAsync: tasksActions.updateTaskAsync,
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
        if(this.props.newTaskDescription.trim() !== ''){
        	this.props.createTaskAsync(taskDescription.trim());
            this.props.clearNewTaskDescription();
        }
    }

    clickHandler = (event) => {
        this.createTask(event, this.props.newTaskDescription)
    }

    keyPressHandler = (event) => {
        if(event.key === 'Enter' ){
            this.createTask(event, this.props.newTaskDescription)
        }
    }

    updateNewTaskDescription = (event) => {
        this.props.updateNewTaskDescription(event.target.value);
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
                removeTaskAsync = {this.props.removeTaskAsync}
                updateTaskAsync = {this.props.updateTaskAsync}
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
                                onKeyPress = {this.keyPressHandler}
                                onChange={this.updateNewTaskDescription}
                                value = {this.props.newTaskDescription}
                            />
                            <button
                           		onClick = {this.clickHandler}
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
