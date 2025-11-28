import { Component } from './component';
import { createContext } from './context';
import { h, hFragment, hString } from './h';
import { createPortal } from './portal';
import type { Ref } from './ref';
import { createRef } from './ref';
import { render } from './render';
import type { ComponentType } from './types/types';

export {
	Component,
	createContext,
	createPortal,
	createRef,
	h,
	hFragment,
	hString,
	render,
};
export type { ComponentType, Ref };
