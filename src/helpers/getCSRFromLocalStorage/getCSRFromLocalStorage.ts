import LocalStorageHelper from '../localStorageHelper/localStorageHelper.ts';

const getCSRFromLocalStorage = (): string => {
	return LocalStorageHelper.getItem('x-csrf-token') || '';
};

export default getCSRFromLocalStorage;
