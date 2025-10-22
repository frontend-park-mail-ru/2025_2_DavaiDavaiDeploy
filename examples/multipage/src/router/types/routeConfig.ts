import type { Component } from '@lib/component';

export interface RouteConfig {
  href: string;
  component: Component
  hasFooter?: boolean;
  hasHeader?: boolean;
}