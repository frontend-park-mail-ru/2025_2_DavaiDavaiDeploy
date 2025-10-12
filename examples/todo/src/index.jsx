/** @jsx jsx */
/** @jsxFrag Fragment */

import {Component} from '../../../lib/dist/react.js';
import {jsx, Fragment} from './jsx-runtime.js';

class TodoItem extends Component {
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
class TodoEditingItem extends Component {
  state = {
    editingText: this.props.initialText,
  };

  handleInputChange = event => {
    this.setState({editingText: event.target.value});
  };

  handleKeyDown = event => {
    if (event.key === 'Enter') {
      if (this.state.editingText.length > 3) {
        this.props.onSave(this.state.editingText);
      }
    } else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  handleSave = () => {
    if (this.state.editingText.length > 3) {
      this.props.onSave(this.state.editingText);
    }
  };

  render() {
    const {id, onCancel} = this.props;
    return (
      <div key={id}>
        <input
          type='text'
          value={this.state.editingText}
          onInput={this.handleInputChange}
          onKeydown={this.handleKeyDown}
        />
        <button disabled={this.state.editingText.length < 4} onClick={this.handleSave}>
          ✓
        </button>
        <button onClick={onCancel}>✗</button>
      </div>
    );
  }
}

class TodoApp extends Component {
  state = {
    todos: [],
    inputValue: '',
    editingId: null,
  };

  addTodo = () => {
    if (this.state.inputValue.trim()) {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: Date.now(),
            text: this.state.inputValue,
            completed: false,
          },
        ],
        inputValue: '',
      });
    }
  };

  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  };

  startEditing = id => {
    this.setState({
      editingId: id,
    });
  };

  saveEdit = newText => {
    if (newText.trim()) {
      this.setState({
        todos: this.state.todos.map(todo =>
          todo.id === this.state.editingId ? {...todo, text: newText} : todo,
        ),
        editingId: null,
      });
    }
  };

  cancelEdit = () => {
    this.setState({
      editingId: null,
    });
  };

  handleInputChange = event => {
    this.setState({inputValue: event.target.value});
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addTodo();
    }
  };

  render() {
    return (
      <Fragment>
        <h1>Simple Todo</h1>
        <div>
          <input
            type='text'
            placeholder='What needs to be done?'
            value={this.state.inputValue}
            onInput={this.handleInputChange}
            onKeypress={this.handleKeyPress}
          />
          <button onClick={this.addTodo} disabled={this.state.inputValue.length < 4}>
            Add
          </button>
        </div>

        <div>
          {this.state.todos.map(todo =>
            this.state.editingId === todo.id ? (
              <TodoEditingItem
                key={todo.id}
                id={todo.id}
                initialText={todo.text}
                onSave={this.saveEdit}
                onCancel={this.cancelEdit}
              />
            ) : (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={this.deleteTodo}
                onStartEditing={this.startEditing}
              />
            ),
          )}
        </div>
      </Fragment>
    );
  }
}

// Запуск приложения
const app = new TodoApp();
app.mount(document.body);
