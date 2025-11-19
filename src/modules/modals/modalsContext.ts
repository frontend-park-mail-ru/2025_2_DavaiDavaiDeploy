import { createContext } from '@/modules/react';

export interface ModalContextValue {
	activeModal: number | null;
	activeModalProps: Record<string, any>[] | null;
	open: (id: number, props: object) => void;
	hide: () => void;
}

export const ModalContext = createContext<ModalContextValue>({
	activeModal: null,
	activeModalProps: null,
	open: (_id: number, _props: object) => {},
	hide: () => {},
});
