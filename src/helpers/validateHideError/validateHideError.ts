/**
 * Скрывает сообщение об ошибке, устанавливая прозрачность элемента в 0.
 */
export function validateHideError(element: HTMLElement | null) {
	if (element) {
		element.style.opacity = '0';
	}
}
