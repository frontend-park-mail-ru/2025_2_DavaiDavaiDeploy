import type { Component } from '@robocotik/react';

export interface RouterContextValue {
	path: string;
	navigate: (to: string | number) => void;
	params: Record<string, any>;
	outlet?: Component | Component[] | null;
}
