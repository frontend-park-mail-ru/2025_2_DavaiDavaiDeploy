import {Route404} from '../route404.tsx';
import type { VDOMElement } from '../types/element.ts';

interface Props {
  children: VDOMElement;
  currPath: string;
}

export function getCurrChild({children, currPath}: Props) {
  if (!children) {
    return <Route404 />;
  }
  if (!Array.isArray(children)) {
    return children;
  } else {
    if (children.length === 1) {
      return children[0];
    }
    let tmp = null;
    children?.forEach(child => {
      if (child.props?.href === currPath) {
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
