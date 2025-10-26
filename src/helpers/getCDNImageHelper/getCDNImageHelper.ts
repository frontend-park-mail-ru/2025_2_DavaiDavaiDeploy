export const getImageSRC = (
	folder: string,
	id: string,
	type: string,
): string => {
	return `${import.meta.env.VITE_CDN_ADDRESS}/static/${folder}/${id}.${type}`;
};
