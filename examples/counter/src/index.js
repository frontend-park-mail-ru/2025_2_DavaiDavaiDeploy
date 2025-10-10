import {hFragment, h, hString, Component} from '../../../lib/dist/react.js';

class Counter extends Component {
  state = {
    count: 0,
  };

  increment() {
    this.setState({count: this.state.count + 1});
  }

  render() {
    return hFragment([
      h('p', {}, [`Count: ${this.state.count}`]),
      h(
        'button',
        {
          on: {click: this.increment},
        },
        [hString('Increment')],
      ),
    ]);
  }
}

class Header extends Component {
  render() {
    return hString('Welcome to the best counter');
  }
}

class Page extends Component {
  render() {
    return hFragment([h(Header), h(Counter)]);
  }
}

// const props = {initialCount: 10};
const page = new Page();

page.mount(document.body);
