import { STATIC_URL } from '@/consts/urls';

export const getImageSRC = (path: string): string => {
	return `${STATIC_URL}${path}`;
};
