import { describe, expect, it } from 'vitest'
import { formatDuration } from './durationFormatHelper'

describe('formatDuration', () => {
	it('возвращает длительность в строке с форматом `{количество часов}ч {количество минут}м`', () => {
		const rating = formatDuration(250)
		expect(rating).toBe('4ч 10м')
	})

	it('правильно форматирует ровно 1 час', () => {
		const result = formatDuration(60)
		expect(result).toBe('1ч 0м')
	})

	it('правильно форматирует меньше часа', () => {
		const result = formatDuration(45)
		expect(result).toBe('0ч 45м')
	})

	it('правильно форматирует 0 минут', () => {
		const result = formatDuration(0)
		expect(result).toBe('0ч 0м')
	})

	it('правильно форматирует ровно несколько часов', () => {
		const result = formatDuration(180)
		expect(result).toBe('3ч 0м')
	})

	it('правильно форматирует одну минуту', () => {
		const result = formatDuration(1)
		expect(result).toBe('0ч 1м')
	})

	it('правильно форматирует большое число (сутки)', () => {
		const result = formatDuration(1440)
		expect(result).toBe('24ч 0м')
	})

	it('правильно форматирует часы и остаток минут', () => {
		const result = formatDuration(125)
		expect(result).toBe('2ч 5м')
	})

	it('правильно форматирует граничное значение 59', () => {
		const result = formatDuration(59)
		expect(result).toBe('0ч 59м')
	})

	it('правильно форматирует граничное значение 61', () => {
		const result = formatDuration(61)
		expect(result).toBe('1ч 1м')
	})
})
