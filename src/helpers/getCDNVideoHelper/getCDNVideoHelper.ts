import { CDN_URL } from '@/consts/urls';

export const getVideoURL = (path: string): string => {
	return `${CDN_URL}${path}`;
};
