export const throttle = (func, wait) => {
	let isCalled = false
	return function (...args) {
		if (!isCalled) {
			func.apply(this, args)
			isCalled = true
			setTimeout(() => {
				isCalled = false
			}, wait)
		}
	}
}
