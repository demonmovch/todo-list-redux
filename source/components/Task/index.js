// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';

export default class Task extends PureComponent {
  remove = () => {
    this.props.removeTaskAsync(this.props.id);
  };

  toggleFavorite = () => {
    const { message, completed, favorite, id } = this.props;

    this.props.updateTaskFavoriteAsync({ message, completed, id, favorite: !favorite });
  };

  toggleCompleted = () => {
    const { message, completed, favorite, id } = this.props;

    this.props.updateTaskCompletedAsync({ message, completed: !completed, id, favorite });
  };

  render() {
    const { message, completed, favorite } = this.props;

    const styles = cx(Styles.task, {
      [Styles.completed]: completed,
    });

    return (
      <li className={styles}>
        <div className={Styles.content}>
          <Checkbox
            inlineBlock
            className={Styles.toggleTaskCompletedState}
            color1='#3B8EF3'
            color2='#FFF'
            onClick={this.toggleCompleted}
            checked={completed}
          />
          <input disabled type='text' value={message} />
        </div>
        <div className={Styles.actions}>
          <Star
            inlineBlock
            className={Styles.toggleTaskFavoriteState}
            color1='#3B8EF3'
            color2='#000'
            checked={favorite}
            onClick={this.toggleFavorite}
          />
          <Edit
            inlineBlock
            checked={false}
            className={Styles.updateTaskMessageOnClick}
            color1='#3B8EF3'
            color2='#000'
          />
          <Remove
            inlineBlock
            className={Styles.removeTask}
            color1='#3B8EF3'
            color2='#000'
            onClick={this.remove}
          />
        </div>
      </li>
    );
  }
}
