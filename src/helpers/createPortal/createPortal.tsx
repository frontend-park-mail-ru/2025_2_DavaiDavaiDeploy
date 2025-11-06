import { Component, render } from '@robocotik/react';

function renderPortal(content: Component, portalRoot: HTMLElement | null) {
	if (portalRoot) {
		render(content as any, portalRoot);
	}
}

export function createPortal(content: any, root: string) {
	let portalRoot = document.getElementById(root);

	if (portalRoot) {
		render(content, portalRoot);
	}

	if (!portalRoot) {
		portalRoot = document.createElement('div');
		portalRoot.id = root;
		document.body.appendChild(portalRoot);
	}

	return renderPortal(content, portalRoot);
}
