import {DOM_TYPES} from './types/consts.ts';
import type {VDOMNode, ElementVDOMNode, ComponentVDOMNode} from './types/vdom.ts';

export function areNodesEqual(nodeOne: VDOMNode, nodeTwo: VDOMNode): boolean {
  if (nodeOne.type !== nodeTwo.type) {
    return false;
  }

  if (nodeOne.type === DOM_TYPES.ELEMENT) {
    const elementOne = nodeOne as ElementVDOMNode;
    const elementTwo = nodeTwo as ElementVDOMNode;

    const {
      tag: tagOne,
      props: {key: keyOne},
    } = elementOne;
    const {
      tag: tagTwo,
      props: {key: keyTwo},
    } = elementTwo;

    return tagOne === tagTwo && keyOne === keyTwo;
  }

  if (nodeOne.type === DOM_TYPES.COMPONENT) {
    const componentOne = nodeOne as ComponentVDOMNode;
    const componentTwo = nodeTwo as ComponentVDOMNode;

    const {tag: tagOne} = componentOne;
    const {tag: tagTwo} = componentTwo;

    return tagOne === tagTwo;
  }

  return true;
}
