import type { ElementAttributes } from './types';

export function setStyle(
	el: HTMLElement,
	name: string,
	value: string | number,
): void {
	(el.style as any)[name] = value.toString();
}

export function removeStyle(el: HTMLElement, name: string): void {
	(el.style as any)[name] = null;
}

export function setAttributes(el: HTMLElement, attrs: ElementAttributes): void {
	const { class: className, style, ...otherAttrs } = attrs;

	if (className) {
		setClass(el, className);
	}

	if (style) {
		Object.entries(style).forEach(([prop, value]) => {
			setStyle(el, prop, value);
		});
	}

	for (const [name, value] of Object.entries(otherAttrs)) {
		setAttribute(el, name, value);
	}
}

function setClass(el: HTMLElement, className: string | string[]): void {
	el.className = '';

	if (typeof className === 'string') {
		el.className = className;
	} else if (Array.isArray(className)) {
		el.classList.add(...className);
	}
}

export function setAttribute(
	el: HTMLElement,
	name: string,
	value: unknown,
): void {
	if (value == null) {
		removeAttribute(el, name);
	} else if (name.startsWith('data-')) {
		el.setAttribute(name, String(value));
	} else {
		(el as any)[name] = value;
	}
}

export function removeAttribute(el: HTMLElement, name: string): void {
	(el as any)[name] = null;
	el.removeAttribute(name);
}
