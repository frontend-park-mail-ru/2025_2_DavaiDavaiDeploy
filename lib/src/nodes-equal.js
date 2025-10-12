import {DOM_TYPES} from './h.js';

export function areNodesEqual(nodeOne, nodeTwo) {
  if (nodeOne.type !== nodeTwo.type) {
    return false;
  }
  if (nodeOne.type === DOM_TYPES.ELEMENT) {
    const {
      tag: componentOne,
      props: {key: keyOne},
    } = nodeOne;
    const {
      tag: componentTwo,
      props: {key: keyTwo},
    } = nodeTwo;
    return componentOne === componentTwo && keyOne === keyTwo;
  }
  if (nodeOne.type === DOM_TYPES.COMPONENT) {
    const {tag: componentOne} = nodeOne;
    const {tag: componentTwo} = nodeTwo;
    return componentOne === componentTwo;
  }
  return true;
}
