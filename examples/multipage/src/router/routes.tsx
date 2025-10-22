import {Component} from '@lib/index';
import type {RoutesConfig} from './types/routesConfig.ts';
import {RouterContext} from './routerContext.ts';
import {Route404} from './route404.tsx';
import {normalize} from './utils/normalize.ts';

interface ContextProps {
  path: string;
}

export class Routes extends Component<RoutesConfig, {}, ContextProps> {
  private toRenderIndex: number | null = null;

  static contextType = RouterContext;

  getCurrChild() {
    if (!this.props.children) {
      return <Route404 />;
    }
    if (!Array.isArray(this.props.children)) {
      return this.props.children;
    } else {
      if (this.props.children.length === 1) {
        return this.props.children[0];
      }
      let tmp = null;
      const path = window.location.pathname;
      let index = 0;
      for (const child of this.props.children) {
        console.log(child);
        if (!child.props?.href) {
          continue;
        }
        console.log('до нормализации', child.props.href as string);
        let href = normalize(child.props.href as string);
        console.log('после  нормализации  ', href);
        const escapedPattern = href.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
        const pattern = escapedPattern.replace(/:\w+/g, '([^/]+)');
        console.log('паттерн', pattern);
        const regex = new RegExp(`^${pattern}$`);
        const match = path.match(regex);

        if (match) {
          const params: Record<string, string> = {};
          const paramNames = [...href.matchAll(/:(\w+)/g)].map(m => m[1]);
          paramNames.forEach((name, i) => {
            params[name] = match[i + 1];
          });
          console.log('у меня метч', params, path);
          this.toRenderIndex = index;
          break;
        }
        index++;
      }
      if (tmp == null) {
        return <Route404 />;
      }
      return tmp;
    }
  }

  render() {
    this.getCurrChild();
    if (!this.props.children || !Array.isArray(this.props.children)) {
      return <Route404 />;
    }
    const currChild = this.props.children[this.toRenderIndex ?? 0];
    if (!currChild) {
      return <Route404 />;
    }
    return currChild;
  }
}
