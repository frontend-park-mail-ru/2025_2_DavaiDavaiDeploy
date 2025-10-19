/**
 * Создаёт объект с функциями для запуска, остановки и проверки статуса выполнения переданной функции с заданным интервалом.
 */
export const createPeriodFunction = (
	func: Function,
	period: number,
): {
	start: () => void;
	isWorking: () => boolean;
	stop: () => void;
} => {
	let intervalId: number | null = null;
	return {
		start: function () {
			if (intervalId === null) {
				intervalId = setInterval(func, period);
			}
		},
		isWorking: function () {
			return intervalId !== null;
		},
		stop: function () {
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
		},
	};
};
