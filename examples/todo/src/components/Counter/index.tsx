import {Component} from '@lib/react.js';
import type {Props} from './Counter.props.ts';

export class Counter extends Component<Props> {
  onWillUnmount(): void {
    console.log('Counter will unmount, current state is ' + this.props.count);
  }

  onUnmount(): void {
    console.log('Set up a destruction, the order sucks');
  }

  onUpdate(): void {
    console.log('Counter updated, new state is ' + this.props.count);
  }

  render() {
    const {count, onIncrement} = this.props;

    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={onIncrement}>Increment</button>
      </div>
    );
  }
}
