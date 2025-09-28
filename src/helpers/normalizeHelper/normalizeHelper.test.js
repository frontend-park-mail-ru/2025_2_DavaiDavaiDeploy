import { describe, expect, it } from 'vitest'
import { normalize } from './normalizeHelper'

describe('normalize', () => {
	it('возвращает путь без повторяющихся подряд слещей и последнего слеша', () => {
		const normalizedPath = normalize('/genre////films/')
		expect(normalizedPath).toBe('/genre/films')
	})
	it('не меняет /', () => {
		const normalizedPath = normalize('/')
		expect(normalizedPath).toBe('/')
	})
})
