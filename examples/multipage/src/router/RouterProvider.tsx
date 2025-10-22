import { Component } from '@lib/index';
import { RouterContext } from './routerContext.ts';
import type {VDOMNode} from '@lib/types';

export default class RouterProvider extends Component {
  state = {
    path: "/"
  }

  constructor(props: any) {
    super(props);
    this.state.path = window.location.pathname;
  }

  navigate = (to: string) => {
    console.log('навигация к ', to);
    if (to === this.state.path) {
      return;
    }
    window.history.pushState({}, '', to);
    this.setState({ path: to });
  }

  handlePopState = () => {
    this.setState({ path: window.location.pathname });
  };

  onMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  onWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render(): VDOMNode {
    return (
      <RouterContext.Provider value={{path: this.state.path, navigate: this.navigate}}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}