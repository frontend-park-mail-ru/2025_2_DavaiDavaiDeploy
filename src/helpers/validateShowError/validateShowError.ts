/**
 * Показывает сообщение об ошибке в указанном DOM-элементе.
 *
 */
export function validateShowError(element: HTMLElement, message: string): void {
	element.textContent = message;
	element.style.opacity = '1';
}
