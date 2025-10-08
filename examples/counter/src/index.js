import {hFragment, h} from '../../../lib/src/h.js';
import {Component} from '../../../lib/src/component.js';

class MyComponent extends Component {
  state = {
    count: 0,
  };

  increment() {
    this.updateState({count: this.state.count + 1});
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
    ]);
  }
}

const counter = new MyComponent();
counter.mount(document.body);
