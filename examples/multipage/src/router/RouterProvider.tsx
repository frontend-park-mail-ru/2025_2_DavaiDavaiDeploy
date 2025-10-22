import { Component } from '@lib/index';
import { RouterContext } from './routerContext.ts';

export default class RouterProvider extends Component {
  private path: string;

  constructor(props: any) {
    super(props);
    this.path = window.location.pathname;
  }
  
  navigate(to: string){
    if (to === window.location.pathname) {
      return;
    }
    window.history.pushState({}, '', to);
    this.path = to;
  }

  handlePopState = () => {
    this.path = window.location.pathname;
  }

  onMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  onWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render() {
    return (
      <RouterContext.Provider value={{ path: this.path, navigate: this.navigate }}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}