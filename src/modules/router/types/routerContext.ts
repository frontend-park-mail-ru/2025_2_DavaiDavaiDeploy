export interface RouterContextValue {
	path: string;
	navigate: (to: string) => void;
	back: VoidFunction;
	params: Record<string, any>;
}
