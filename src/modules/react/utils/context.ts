import type { Component } from '../component';

export const isProvider = (component: Component) => {
	return component.constructor.name.includes('Provider');
};

export const isConsumer = (component: Component) => {
	return component.constructor.name.includes('Consumer');
};
