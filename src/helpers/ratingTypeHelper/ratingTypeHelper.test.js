import { describe, expect, it } from 'vitest'
import { getRatingType } from './ratingTypeHelper'

describe('getRatingType', () => {
	it('возвращает high если рейтинг не меньше 8', () => {
		const ratingType = getRatingType(9)
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
})
