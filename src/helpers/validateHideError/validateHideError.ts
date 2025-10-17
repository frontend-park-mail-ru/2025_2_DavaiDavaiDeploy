/**
 * Скрывает сообщение об ошибке, устанавливая прозрачность элемента в 0.
 *
 * @param {HTMLElement | null} element - DOM-элемент, у которого нужно скрыть сообщение.
 */
export function validateHideError(element: HTMLElement | null) {
	if (element) {
		element.style.opacity = '0'
	}
}
