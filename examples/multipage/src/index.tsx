import {Component, render} from '@lib/index.ts';
import RouterProvider from './router/RouterProvider.tsx';
import {Route} from './router/route.tsx';
import {Link} from './router/link.tsx';
import type {VDOMNode} from '@lib/types';

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

export class App extends Component {
  render() {
    return (
      <RouterProvider>
        <Route hasFooter={false} href='/' component={<Home />} />
        <Route href='/about' component={<About />} />
      </RouterProvider>
    );
  }
}

render(<App />, document.body);
