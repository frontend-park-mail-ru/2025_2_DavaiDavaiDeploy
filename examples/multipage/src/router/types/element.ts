import type { VDOMNode } from '@lib/types/index.ts';

export type VDOMElement =
  | VDOMNode
  | VDOMNode[]
  | string
  | Function
  | undefined;