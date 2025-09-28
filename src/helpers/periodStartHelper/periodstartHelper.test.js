import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPeriodFunction } from './periodStartHelper'

describe('createPeriodperiodFunction', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('не начинает выполнения функции при инициализации', () => {
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
})
