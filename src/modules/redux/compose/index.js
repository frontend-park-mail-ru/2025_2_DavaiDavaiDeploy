/**
 * Композиция функций справа налево.
 *
 * @param {...Function} funcs - Функции для композиции.
 * @returns {Function} Одна функция, полученная в результате композиции.
 */
export function compose(...funcs) {
	if (funcs.length === 0) {
		return arg => arg
	}
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce(
		(a, b) =>
			(...args) =>
				a(b(...args)),
	)
}
