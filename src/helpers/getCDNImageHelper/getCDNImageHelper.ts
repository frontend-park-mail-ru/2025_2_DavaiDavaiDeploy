import { STATIC_URL } from '@/consts/urls';

export const getImageSRC = (
	folder: string,
	id: string,
	type: string,
): string => {
	return `${STATIC_URL}${folder}/${id}.${type}`;
};
