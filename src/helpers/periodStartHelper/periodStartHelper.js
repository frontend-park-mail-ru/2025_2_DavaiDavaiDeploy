export const createPeriodFunction = (func, period) => {
	let intervalId = null
	return {
		start: function () {
			if (intervalId === null) {
				intervalId = setInterval(func, period)
			}
		},
		isWorking: function () {
			return intervalId !== null
		},
		stop: function () {
			if (intervalId !== null) {
				clearInterval(intervalId)
				intervalId = null
			}
		},
	}
}
