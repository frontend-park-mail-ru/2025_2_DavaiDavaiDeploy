import {Component} from '@lib/index';
import {RouterContext} from './routerContext.ts';
import type {VDOMNode} from '@lib/types';
import {Route404} from './route404.tsx';
// import Header from '../components/header.tsx';
// import Footer from '../components/footer.tsx';

export default class RouterProvider extends Component {
  state = {
    path: '/',
  };

  constructor(props: any) {
    super(props);
    this.state.path = window.location.pathname;
  }

  trimRoute(route: string): string {
    if (route.length > 1 && route.endsWith('/')) {
      route = route.slice(0, -1);
    }

    return route;
  }

  navigate = (to: string) => {
    if (to === this.state.path) {
      return;
    }
    window.history.pushState({}, '', to);
    this.setState({path: to});
  };

  handlePopState = () => {
    this.setState({path: window.location.pathname});
  };

  onMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  onWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  getCurrChild() {
    if (!Array.isArray(this.props.children)) {
      return this.props.children;
    } else {
      if (this.props.children.length === 1) {
        return this.props.children[0];
      }
      let tmp = null;
      this.props.children?.forEach(child => {
        if (child.props?.href === this.state.path) {
          tmp = child;
          return;
        }
      });
      if (tmp == null) {
        return <Route404 />;
      }
      return tmp;
    }
  }

  render(): VDOMNode {
    return (
      <RouterContext.Provider value={{path: this.state.path, navigate: this.navigate}}>
        {this.getCurrChild()}
      </RouterContext.Provider>
    );
  }
}
