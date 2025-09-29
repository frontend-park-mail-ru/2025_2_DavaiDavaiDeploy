import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPeriodFunction } from './periodStartHelper'

describe('createPeriodperiodFunction', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('не начинает выполнение функции при инициализации', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)
		expect(periodFunc.isWorking()).toBe(false)
	})

	it('начинает периодические вызовы функции при вызове start', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)
		periodFunc.start()
		expect(periodFunc.isWorking()).toBe(true)
	})

	it('останавливает периодические вызовы функции при вызове stop', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()
		expect(periodFunc.isWorking()).toBe(true)

		periodFunc.stop()
		expect(periodFunc.isWorking()).toBe(false)

		vi.advanceTimersByTime(3000)
		expect(func).not.toHaveBeenCalled()
	})

	it('вызывает функцию через равные временные интервалы', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()

		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(1)

		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(2)

		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(3)
	})

	it('не создает новый интервал при повторном вызове start', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()
		const firstIntervalId = periodFunc.isWorking()

		periodFunc.start()
		const secondIntervalId = periodFunc.isWorking()

		expect(firstIntervalId).toBe(secondIntervalId)

		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(1)
	})

	it('корректно работает после остановки и повторного запуска', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()
		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(1)

		periodFunc.stop()
		vi.advanceTimersByTime(2000)
		expect(func).toHaveBeenCalledTimes(1)

		periodFunc.start()
		vi.advanceTimersByTime(1000)
		expect(func).toHaveBeenCalledTimes(2)
	})

	it('не вызывает функцию до истечения первого интервала', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()

		vi.advanceTimersByTime(500)
		expect(func).not.toHaveBeenCalled()

		vi.advanceTimersByTime(500)
		expect(func).toHaveBeenCalledTimes(1)
	})

	it('корректно работает с разными периодами', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 500)

		periodFunc.start()

		vi.advanceTimersByTime(500)
		expect(func).toHaveBeenCalledTimes(1)

		vi.advanceTimersByTime(500)
		expect(func).toHaveBeenCalledTimes(2)
	})

	it('isWorking возвращает false после остановки', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		periodFunc.start()
		expect(periodFunc.isWorking()).toBe(true)

		periodFunc.stop()
		expect(periodFunc.isWorking()).toBe(false)
	})

	it('stop не вызывает ошибок если интервал не запущен', () => {
		const func = vi.fn()
		const periodFunc = createPeriodFunction(func, 1000)

		expect(() => {
			periodFunc.stop()
		}).not.toThrow()

		expect(periodFunc.isWorking()).toBe(false)
	})
})
