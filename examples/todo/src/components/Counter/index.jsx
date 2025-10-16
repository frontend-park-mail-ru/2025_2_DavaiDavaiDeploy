import {Component} from '@lib/react.js';

export class Counter extends Component {
  onWillUnmount() {
    console.log('Counter will unmount, current state is ' + this.props.count);
  }

  onUnmount() {
    console.log('Set up a destruction, the order sucks');
  }

  onUpdate() {
    console.log('Counter updated, new state is ' + this.props.count);
  }

  render() {
    const {count, onIncrement, onToggleVisibility} = this.props;

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onToggleVisibility}>toggle visibility</button>
      </div>
    );
  }
}
