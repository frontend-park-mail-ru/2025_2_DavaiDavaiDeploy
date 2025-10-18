interface ThrottledFunction {
	(...args: any[]): void
}
/**
 * Создаёт "троттлированную" версию функции, которая вызывается не чаще одного раза за указанный интервал.
 */
export const throttle = (func: Function, wait: number): ThrottledFunction => {
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
