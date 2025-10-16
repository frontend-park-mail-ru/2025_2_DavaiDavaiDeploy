import {hFragment, h, hString, Component} from '../../../lib/dist/react.js';

class Counter extends Component {
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

class Header extends Component {
  onMount() {
    console.log('Header mounted');
  }
  onUnmount() {
    console.log('Header unmounted');
  }
  render() {
    return hString('Welcome to the best counter');
  }
}

class Page extends Component {
  state = {
    count: 0,
    firstCounterShown: true,
    secondCounterShown: true,
  };

  toggleVisibility(counter) {
    this.setState({[counter]: !this.state[counter]});
  }

  increment = () => {
    this.setState(prev => ({
      count: prev.count + 1,
    }));
  };

  render() {
    return hFragment([
      h(Header),
      this.state.firstCounterShown
        ? h(Counter, {
            key: 1,
            onIncrement: this.increment,
            count: this.state.count,
            onToggleVisibility: () => this.toggleVisibility('firstCounterShown'),
          })
        : null,
      this.state.secondCounterShown
        ? h(Counter, {
            key: 2,
            onIncrement: this.increment,
            count: this.state.count,
            onToggleVisibility: () => this.toggleVisibility('secondCounterShown'),
          })
        : null,
    ]);
  }
}

// const props = {initialCount: 10};
const page = new Page();

page.mount(document.body);
