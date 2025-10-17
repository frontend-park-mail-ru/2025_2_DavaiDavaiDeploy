/**
 * Показывает сообщение об ошибке в указанном DOM-элементе.
 *
 * @param {HTMLElement} element - DOM-элемент, в котором будет показано сообщение.
 * @param {string} message - Текст ошибки.
 */
export function validateShowError(element: HTMLElement, message: string) {
	element.textContent = message
	element.style.opacity = '1'
}
