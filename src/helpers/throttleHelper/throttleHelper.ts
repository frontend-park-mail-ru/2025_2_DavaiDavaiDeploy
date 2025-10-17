/**
 * Создаёт "троттлированную" версию функции, которая вызывается не чаще одного раза за указанный интервал.
 *
 * @param {Function} func - Функция, которую нужно ограничить по частоте вызова.
 * @param {number} wait - Интервал времени в миллисекундах.
 * @returns {Function} Троттлированная функция.
 */
export const throttle = (
	func: Function,
	wait: number,
): ((...args: any[]) => void) => {
	let isCalled = false

	return function (this: any, ...args: any[]) {
		if (!isCalled) {
			func.apply(this, args)
			isCalled = true
			setTimeout(() => {
				isCalled = false
			}, wait)
		}
	}
}
