export class TodoEditingItem extends Component {
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
