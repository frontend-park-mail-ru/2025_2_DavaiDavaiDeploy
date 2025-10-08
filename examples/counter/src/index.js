import {hFragment, h} from '../../../src/h.js';
import {Component} from '../../../src/component.js';

class MyComponent extends Component {
  increment() {
    this.updateState({count: this.state.count + 1});
  }

  constructor(props) {
    super(
      props,
      function () {
        return {count: props.initialCount || 0};
      },
      function () {
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
      },
    );
  }
}

const props = {initialCount: 10};
const counter = new MyComponent(props);
counter.mount(document.body);
