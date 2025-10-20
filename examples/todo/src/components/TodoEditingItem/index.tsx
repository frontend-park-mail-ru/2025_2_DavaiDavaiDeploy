import {Component} from '@lib/react.js';
import type {TodoEditingItemProps} from './TodoEditingItem.props.js';

export class TodoEditingItem extends Component<TodoEditingItemProps> {
  state = {
    editingText: this.props.initialText,
  };

  handleInputChange = (event: InputEvent) => {
    this.setState({editingText: (event.target as HTMLInputElement).value});
  };

  handleKeyDown = (event: KeyboardEvent) => {
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
          onKeyDown={this.handleKeyDown}
        />
        <button disabled={this.state.editingText.length < 4} onClick={this.handleSave}>
          ✓
        </button>
        <button onClick={onCancel}>✗</button>
      </div>
    );
  }
}
