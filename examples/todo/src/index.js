import {hFragment, h, Component} from '../../../lib/dist/react.js';

class TodoItem extends Component {
  render() {
    const {todo, onDelete, onStartEditing} = this.props;

    return h('div', {key: todo.id}, [
      h(
        'span',
        {
          on: {dblclick: () => onStartEditing(todo.id, todo.text)},
        },
        [todo.text],
      ),
      h(
        'button',
        {
          on: {click: () => onDelete(todo.id)},
        },
        [' × '],
      ),
    ]);
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
    return h('div', {key: this.props.id}, [
      h('input', {
        type: 'text',
        value: this.state.editingText,
        on: {
          input: this.handleInputChange,
          keydown: this.handleKeyDown,
        },
      }),
      h(
        'button',
        {
          on: {click: this.handleSave},
        },
        ['✓'],
      ),
      h(
        'button',
        {
          on: {click: this.props.onCancel},
        },
        ['✗'],
      ),
    ]);
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
    return hFragment([
      h('h1', {}, ['Simple Todo']),

      h('div', {}, [
        h('input', {
          type: 'text',
          placeholder: 'What needs to be done?',
          value: this.state.inputValue,
          on: {
            input: this.handleInputChange,
            keypress: this.handleKeyPress,
          },
        }),
        h('button', {on: {click: this.addTodo}, disabled: this.state.inputValue.length < 4}, [
          'Add',
        ]),
      ]),

      h(
        'div',
        {},
        this.state.todos.map(todo =>
          this.state.editingId === todo.id
            ? h(TodoEditingItem, {
                key: todo.id,
                id: todo.id,
                initialText: todo.text,
                onSave: this.saveEdit,
                onCancel: this.cancelEdit,
              })
            : h(TodoItem, {
                key: todo.id,
                todo: todo,
                onDelete: this.deleteTodo,
                onStartEditing: this.startEditing,
              }),
        ),
      ),
    ]);
  }
}

// Запуск приложения
const app = new TodoApp();
app.mount(document.body);
