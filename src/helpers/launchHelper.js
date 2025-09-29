/**
 * Создаёт объект с функциями для запуска, остановки и проверки статуса выполнения переданной функции с заданным интервалом.
 *
 * @param {Function} func - Функция, которую нужно периодически выполнять.
 * @param {number} period - Интервал между вызовами в миллисекундах.
 * @returns {{
 *   start: Function,
 *   stop: Function,
 *   isWorking: Function
 * }} Объект с методами управления периодическим выполнением.
 */
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
