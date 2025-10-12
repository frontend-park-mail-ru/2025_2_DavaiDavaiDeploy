import {hFragment, h, hString, Component} from '../../../lib/dist/react.js';

class Counter extends Component {
  state = {
    isShown: true,
  };

  toggleVisibility() {
    this.setState({isShown: !this.state.isShown});
  }

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
    return h('div', {}, [
      this.state.isShown ? h('p', {}, [`Count: ${this.props.count}`]) : null,
      this.state.isShown
        ? h(
            'button',
            {
              on: {click: this.props.onIncrement},
            },
            ['Increment'],
          )
        : null,
      h(
        'button',
        {
          on: {click: this.toggleVisibility},
        },
        ['toggle visibility'],
      ),
    ]);
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
  };

  increment = () => {
    this.setState({count: this.state.count + 1});
  };

  render() {
    return hFragment([
      h(Header),
      h(Counter, {key: 1, onIncrement: this.increment, count: this.state.count}),
      h(Counter, {key: 2, onIncrement: this.increment, count: this.state.count}),
    ]);
  }
}

// const props = {initialCount: 10};
const page = new Page();

page.mount(document.body);
