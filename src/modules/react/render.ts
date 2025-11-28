import { mountDOM } from './mount-dom';
import type { VDOMNode } from './types';

export function render(vnode: VDOMNode, container: HTMLElement) {
	if (!container) {
		throw new Error('Container element is not provided for rendering.');
	}
	mountDOM(vnode, container);
}
