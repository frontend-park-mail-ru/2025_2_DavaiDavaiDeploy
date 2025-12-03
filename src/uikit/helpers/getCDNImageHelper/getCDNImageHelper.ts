import { STATIC_URL } from '../../consts/urls';

export const getImageURL = (path: string): string => {
	return `${STATIC_URL}${path}`;
};
