import type { Component } from './component.ts';

export type EventHandler<T extends Event = Event> = (event: T) => void;
export type EventListeners = Record<string, EventHandler>;

export function addEventListener<T extends Event = Event>(
	eventName: string,
	handler: EventHandler<T>,
	el: HTMLElement,
	hostComponent: Component | null = null,
): EventHandler<T> {
	function boundHandler(event: Event) {
		const typedEvent = event as T;
		if (hostComponent) {
			handler.call(hostComponent, typedEvent);
		} else {
			handler(typedEvent);
		}
	}

	el.addEventListener(eventName, boundHandler);
	return boundHandler;
}

export function addEventListeners(
	listeners: Record<string, Function> = {},
	el: HTMLElement,
	hostComponent: Component | null = null,
): EventListeners {
	const addedListeners: EventListeners = {};

	Object.entries(listeners).forEach(([eventName, handler]) => {
		addedListeners[eventName] = addEventListener(
			eventName,
			handler as EventHandler,
			el,
			hostComponent,
		);
	});

	return addedListeners;
}

export function removeEventListeners(
	listeners: Record<string, Function> = {},
	el: HTMLElement,
): void {
	Object.entries(listeners).forEach(([eventName, handler]) => {
		el.removeEventListener(eventName, handler as unknown as EventListener);
	});
}
