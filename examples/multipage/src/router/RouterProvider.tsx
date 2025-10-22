import {Component} from '@lib/index';
import {RouterContext} from './routerContext.ts';
import type {VDOMNode} from '@lib/types';
import {trimRoute} from './utils/trimRoute.ts';
import {getCurrChild} from './utils/getCurrChild.tsx';
import {extractQuery} from './utils/extractQuery.ts';

export class RouterProvider extends Component {
  state = {
    path: '/',
    params: {},
  };

  constructor(props: any) {
    super(props);
    this.state.path = window.location.pathname;
  }

  navigate = (to: string) => {
    if (to === this.state.path) {
      return;
    }
    window.history.pushState({}, '', trimRoute(to));
    this.setState({path: trimRoute(to), params: extractQuery(to)});
  };

  handlePopState = () => {
    this.setState({path: trimRoute(window.location.pathname), params: extractQuery(window.location.href)});
  };

  onMount() {
    this.setState({
      path: trimRoute(window.location.pathname),
      params: extractQuery(window.location.href),
    });
    console.log(this.state.params)
    window.addEventListener('popstate', this.handlePopState);
  }

  onWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  render(): VDOMNode {
    return (
      <RouterContext.Provider value={{path: this.state.path, navigate: this.navigate}}>
        {getCurrChild({children: this.props.children, currPath: this.state.path})}
      </RouterContext.Provider>
    );
  }
}
