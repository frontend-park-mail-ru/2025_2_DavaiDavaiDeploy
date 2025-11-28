import { createContext } from '@/modules/react';

export interface ModalContextValue {
	activeModal: number | null;
	activeModalProps: Record<string, any>[] | null;
	isClosing: boolean;
	open: (id: number, props: object) => void;
	hide: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
	activeModal: null,
	activeModalProps: null,
	isClosing: false,
	open: (_id: number, _props: object) => {},
	hide: () => {},
});
