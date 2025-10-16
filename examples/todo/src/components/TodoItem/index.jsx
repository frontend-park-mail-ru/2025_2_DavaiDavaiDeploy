import {Component} from '@lib/react.js';

export class TodoItem extends Component {
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
