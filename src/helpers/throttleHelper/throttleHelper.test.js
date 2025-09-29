import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { throttle } from './throttleHelper'

describe('throttle', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('вызывает функцию если таймер истек', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)
		throttledFunc()
		vi.advanceTimersByTime(1000)
		throttledFunc()
		expect(func).toHaveBeenCalledTimes(2)
	})

	it('не вызывает функцию раньше истечения таймера', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc()
		throttledFunc()
		throttledFunc()

		expect(func).toHaveBeenCalledTimes(1)

		vi.advanceTimersByTime(500)
		throttledFunc()
		expect(func).toHaveBeenCalledTimes(1)
	})

	it('вызывает функцию только один раз при множественных вызовах в пределах таймера', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc()
		throttledFunc()
		throttledFunc()

		expect(func).toHaveBeenCalledTimes(1)
	})

	it('передает правильные аргументы в функцию', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc('test', 123)
		expect(func).toHaveBeenCalledWith('test', 123)
	})

	it('сохраняет контекст this', () => {
		const context = { value: 42 }
		let receivedContext
		const func = function () {
			receivedContext = this
		}
		const throttledFunc = throttle(func.bind(context), 1000)

		throttledFunc()
		expect(receivedContext).toBe(context)
	})

	it('позволяет вызвать функцию снова после истечения таймера', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc()
		vi.advanceTimersByTime(1000)
		throttledFunc()

		expect(func).toHaveBeenCalledTimes(2)
	})

	it('работает с нулевым временем ожидания', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 0)

		throttledFunc()
		throttledFunc()
		throttledFunc()

		expect(func).toHaveBeenCalledTimes(1)
	})

	it('работает корректно с разными временами ожидания', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 500)

		throttledFunc()
		vi.advanceTimersByTime(500)
		throttledFunc()

		expect(func).toHaveBeenCalledTimes(2)
	})

	it('вызывает функцию в конце интервала при множественных вызовах', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc('first')
		throttledFunc('second')
		throttledFunc('third')

		expect(func).toHaveBeenCalledTimes(1)
		expect(func).toHaveBeenCalledWith('first')

		vi.advanceTimersByTime(1000)

		throttledFunc('fourth')
		expect(func).toHaveBeenCalledTimes(2)
		expect(func).toHaveBeenCalledWith('fourth')
	})

	it('работает корректно при последовательных вызовах с паузами', () => {
		const func = vi.fn()
		const throttledFunc = throttle(func, 1000)

		throttledFunc('call1')
		expect(func).toHaveBeenCalledTimes(1)

		vi.advanceTimersByTime(1500)
		throttledFunc('call2')
		expect(func).toHaveBeenCalledTimes(2)

		vi.advanceTimersByTime(500)
		throttledFunc('call3')
		expect(func).toHaveBeenCalledTimes(2)

		vi.advanceTimersByTime(500)
		throttledFunc('call4')
		expect(func).toHaveBeenCalledTimes(3)
	})
})
