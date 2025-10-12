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
    return h('div', {}, [
      this.props.isShown ? h('p', {}, [`Count: ${this.props.count}`]) : null,
      this.props.isShown
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
          on: {click: this.props.onToggleVisibility},
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
    firstCounterShown: true,
    secondCounterShown: true,
  };

  toggleVisibility(counter) {
    this.setState({[counter]: !this.state[counter]});
  }

  increment = () => {
    this.setState({count: this.state.count + 1});
  };

  render() {
    return hFragment([
      h(Header),
      h(Counter, {
        key: 1,
        onIncrement: this.increment,
        count: this.state.count,
        isShown: this.state.firstCounterShown,
        onToggleVisibility: () => this.toggleVisibility('firstCounterShown'),
      }),
      h(Counter, {
        key: 2,
        onIncrement: this.increment,
        count: this.state.count,
        isShown: this.state.secondCounterShown,
        onToggleVisibility: () => this.toggleVisibility('secondCounterShown'),
      }),
    ]);
  }
}

// const props = {initialCount: 10};
const page = new Page();

page.mount(document.body);
