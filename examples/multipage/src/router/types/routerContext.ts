export interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}
