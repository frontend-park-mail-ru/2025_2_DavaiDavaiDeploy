import type { Component } from '@lib/component.ts';

export interface LinkProps {
  href: string;
  children: Component | Component[] | string | number | null | undefined;
}