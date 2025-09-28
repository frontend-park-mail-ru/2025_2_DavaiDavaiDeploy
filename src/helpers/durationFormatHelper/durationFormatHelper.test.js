import { describe, expect, it } from 'vitest'
import { formatDuration } from './durationFormatHelper'

describe('formatDuration', () => {
	it('возвращает длительность в строке с форматом `{количество часов}ч {количество минут}м`', () => {
		const rating = formatDuration(250)
		expect(rating).toBe('4ч 10м')
	})
})
