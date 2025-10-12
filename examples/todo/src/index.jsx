/** @jsx jsx */
/** @jsxFrag Fragment */

import {h, hFragment, Component} from '../../../lib/dist/react.js';

// JSX factory функция
function jsx(tag, props, ...children) {
  if (tag === Fragment) {
    return hFragment(children.flat());
  }

  // Для компонентов передаем props как есть
  if (typeof tag === 'function' || (typeof tag === 'object' && 'render' in tag)) {
    const componentProps = {...props};

    // Добавляем children в props если они есть
    if (children.length > 0) {
      componentProps.children = children.flat().filter(child => child != null);
    }

    return h(tag, componentProps);
  }

  // Для DOM элементов обрабатываем события и атрибуты
  const events = {};
  const attributes = {};

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.slice(2).toLowerCase();
        events[eventName] = value;
      } else if (key === 'className') {
        attributes['class'] = value;
      } else if (key === 'style' && typeof value === 'object') {
        attributes['style'] = value;
      } else if (key !== 'children' && key !== 'key') {
        attributes[key] = value;
      }
    });
  }

  const flatChildren = children.flat().filter(child => child != null);

  return h(tag, {...attributes, on: events}, flatChildren);
}

// Fragment символ
const Fragment = Symbol('Fragment');

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
      this.props.onSave(this.state.editingText);
    } else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  handleSave = () => {
    this.props.onSave(this.state.editingText);
  };

  render() {
    return (
      <div key={this.props.id}>
        <input
          type='text'
          value={this.state.editingText}
          onInput={this.handleInputChange}
          onKeydown={this.handleKeyDown}
        />
        <button onClick={this.handleSave}>✓</button>
        <button onClick={this.props.onCancel}>✗</button>
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

  startEditing = (id, text) => {
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
