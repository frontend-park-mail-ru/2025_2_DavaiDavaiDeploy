import { describe, expect, it } from 'vitest'
import { formatRating } from './ratingFormatHelper'

describe('formatRating', () => {
	it('возвращает рейтинг в строке с форматом `{число}.{число}`', () => {
		const rating = formatRating(9)
		expect(rating).toBe('9.0')
	})
})
