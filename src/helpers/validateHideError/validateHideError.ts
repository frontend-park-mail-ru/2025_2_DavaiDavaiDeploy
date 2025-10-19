/**
 * Скрывает сообщение об ошибке, устанавливая прозрачность элемента в 0.
 */
export function validateHideError(element: HTMLElement | null): void {
	if (element) {
		element.style.opacity = '0';
	}
}
