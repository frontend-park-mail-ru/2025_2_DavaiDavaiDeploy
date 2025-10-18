type ThrottledFunction<T extends (...args: any[]) => any> = (
	...args: Parameters<T>
) => void

/**
 * Создаёт "троттлированную" версию функции, которая вызывается не чаще одного раза за указанный интервал.
 */
export const throttle = <T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): ThrottledFunction<T> => {
	let isCalled = false
	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (!isCalled) {
			func.apply(this, args)
			isCalled = true
			setTimeout(() => {
				isCalled = false
			}, wait)
		}
	}
}
