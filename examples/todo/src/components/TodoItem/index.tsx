import {Component} from '@lib/react.js';
import type {TodoItemProps} from './TodoItem.props.ts';

export class TodoItem extends Component<TodoItemProps> {
  render() {
    const {todo, onDelete, onStartEditing} = this.props;

    return (
      <div key={todo.id}>
        <span onDblclick={() => onStartEditing(todo.id, todo.text)}>{todo.text}</span>
        <button onClick={() => onDelete(todo.id)}> × </button>
      </div>
    );
  }
}
