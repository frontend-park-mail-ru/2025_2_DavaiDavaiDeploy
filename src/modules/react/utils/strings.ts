export function isNotEmptyString(str: string): boolean {
	return str !== '';
}
export function isNotBlankOrEmptyString(str: string): boolean {
	return isNotEmptyString(str.trim());
}
