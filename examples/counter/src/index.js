import {hFragment, h, hString, Component} from '../../../lib/dist/react.js';

class Counter extends Component {
  state = {
    count: 0,
  };

  increment() {
    this.setState({count: this.state.count + 1});
  }

  delete() {
    this.unmount();
  }

  onWillUnmount() {
    console.log('Counter will unmount, current state is ' + this.state.count);
  }

  onUnmount() {
    console.log('Set up a destruction, the order sucks');
  }

  onUpdate() {
    console.log('Counter updated, new state is ' + this.state.count);
  }

  render() {
    return hFragment([
      h('p', {}, [`Count: ${this.state.count}`]),
      h(
        'button',
        {
          on: {click: this.increment},
        },
        ['Increment'],
      ),
      h(
        'button',
        {
          on: {click: this.delete},
        },
        ['delete counter'],
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
  render() {
    return hFragment([h(Header), h(Counter, {key: 1}), h(Counter, {key: 2})]);
  }
}

// const props = {initialCount: 10};
const page = new Page();

page.mount(document.body);
