import {TodoItem} from './components/TodoItem/index.jsx';
import {TodoEditingItem} from './components/TodoEditingItem/index.jsx';
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
      <>
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
      </>
    );
  }
}

const app = new TodoApp();
app.mount(document.body);
