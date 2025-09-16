import Component from '../components/core/baseComponent.js';

export default class Test extends Component {
  constructor(parent, props = {}) {
    super(parent, props, 'test');
  }

  render() {
    this.parent.insertAdjacentHTML('afterbegin', this.html({ text: this.props.text }));
  }
}