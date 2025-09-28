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
})
