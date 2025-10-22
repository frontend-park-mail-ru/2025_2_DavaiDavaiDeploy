import {Component, render} from '@lib/index.ts';
import {RouterProvider} from './router/RouterProvider.tsx';
import {Route} from './router/route.tsx';
import {Link} from './router/link.tsx';
import type {VDOMNode} from '@lib/types';
import {Routes} from './router/routes.tsx';
import {RouterContext} from './router/routerContext.ts';
import type {RouterContextValue} from './router/types/routerContext.ts';

class Home extends Component {
  render(): VDOMNode {
    return (
      <>
        <div>У КАЖДОГО ДОЛЖЕН БЫТЬ СВОЙ HOME @kanev</div>;
        <Link href='/about'>Перейти на страницу "Обо мне"</Link>
      </>
    );
  }
}

class About extends Component {
  render(): VDOMNode {
    return (
      <>
        <div>ОБО МНЕ: Я - КАНЕВ ВЛАДИСЛАВ</div>
        <Link href='/'>Перейти на страницу "Главная"</Link>
      </>
    );
  }
}

class AboutId extends Component<{}, {}, RouterContextValue> {
  static contextType = RouterContext;

  render(): VDOMNode {
    return (
      <>
        <div>About ID</div>
        <p>{this.context.params.id}</p>
        <Link href='/'>Перейти на страницу "Главная"</Link>
      </>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <RouterProvider>
        <Routes>
          <Route href='/' component={<Home />} />
          <Route href='/about' component={<About />} />
          <Route href='/about/:id' component={<AboutId />} />
        </Routes>
      </RouterProvider>
    );
  }
}

render(<App />, document.body);
