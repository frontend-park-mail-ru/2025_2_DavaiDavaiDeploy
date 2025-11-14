import { createContext } from '@robocotik/react';

export interface ModalContextValue {
	activeModal: number | null;
	open: (id: number) => void;
	hide: (id: number) => void;
}

export const ModalContext = createContext<ModalContextValue>({
	activeModal: null,
	open: (_id: number) => {},
	hide: (_id: number) => {},
});
