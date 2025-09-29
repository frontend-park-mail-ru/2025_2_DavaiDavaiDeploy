import { describe, expect, it } from 'vitest'
import { getRatingType } from './ratingTypeHelper'

describe('getRatingType', () => {
	it('возвращает high если рейтинг не меньше 8', () => {
		const ratingType = getRatingType(9)
		expect(ratingType).toBe('high')
	})

	it('возвращает high для рейтинга 8', () => {
		const ratingType = getRatingType(8)
		expect(ratingType).toBe('high')
	})

	it('возвращает medium если рейтинг меньше 8, но не меньше 5', () => {
		const ratingType = getRatingType(7)
		expect(ratingType).toBe('medium')
	})

	it('возвращает low если рейтинг меньше 5', () => {
		const ratingType = getRatingType(3)
		expect(ratingType).toBe('low')
	})

	it('возвращает medium для рейтинга 5', () => {
		const ratingType = getRatingType(5)
		expect(ratingType).toBe('medium')
	})

	it('возвращает low для рейтинга 0.1', () => {
		const ratingType = getRatingType(0)
		expect(ratingType).toBe('low')
	})

	it('возвращает low для рейтинга 1', () => {
		const ratingType = getRatingType(1)
		expect(ratingType).toBe('low')
	})

	it('возвращает low для рейтинга 0', () => {
		const ratingType = getRatingType(0)
		expect(ratingType).toBe('low')
	})

	it('возвращает medium для рейтинга 7.9', () => {
		const ratingType = getRatingType(7.9)
		expect(ratingType).toBe('medium')
	})

	it('возвращает high для рейтинга 10', () => {
		const ratingType = getRatingType(10)
		expect(ratingType).toBe('high')
	})
})
