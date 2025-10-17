import { describe, expect, it } from 'vitest'
import { formatRating } from './ratingFormatHelper'

describe('formatRating', () => {
	it('возвращает рейтинг в строке с форматом `{число}.{число}`', () => {
		const rating = formatRating(9)
		expect(rating).toBe('9.0')
	})

	it('корректно форматирует целые числа', () => {
		expect(formatRating(5)).toBe('5.0')
		expect(formatRating(10)).toBe('10.0')
	})

	it('обрабатывает нулевой рейтинг', () => {
		expect(formatRating(0)).toBe('0.0')
	})

	it('возвращает строку для дробных чисел', () => {
		expect(typeof formatRating(7.5)).toBe('string')
	})

	it('возвращает строку для целых чисел', () => {
		expect(typeof formatRating(3)).toBe('string')
		expect(typeof formatRating(0)).toBe('string')
	})

	it('возвращает строку для 0', () => {
		expect(typeof formatRating(0)).toBe('string')
	})

	it('корректно форматирует дробные числа', () => {
		expect(formatRating(8.3)).toBe('8.3')
	})

	it('корректно форматирует числа меньше 1', () => {
		expect(formatRating(0.7)).toBe('0.7')
	})

	it('корректно форматирует число 1.0', () => {
		expect(formatRating(1.0)).toBe('1.0')
	})

	it('корректно форматирует число 6.1', () => {
		expect(formatRating(6.1)).toBe('6.1')
	})
})
