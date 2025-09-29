import { describe, expect, it } from 'vitest'
import { normalize } from './normalizeHelper'

describe('normalize', () => {
	it('возвращает путь без повторяющихся подряд слешей и последнего слеша', () => {
		const normalizedPath = normalize('/genre////films/')
		expect(normalizedPath).toBe('/genre/films')
	})

	it('не меняет /', () => {
		const normalizedPath = normalize('/')
		expect(normalizedPath).toBe('/')
	})

	it('убирает конечный слеш, если он есть', () => {
		const normalizedPath = normalize('/movies/')
		expect(normalizedPath).toBe('/movies')
	})

	it('не убирает конечный слеш, если это корневой /', () => {
		const normalizedPath = normalize('/')
		expect(normalizedPath).toBe('/')
	})

	it('заменяет несколько подряд слешей одним', () => {
		const normalizedPath = normalize('/foo////bar//baz')
		expect(normalizedPath).toBe('/foo/bar/baz')
	})

	it('работает без изменений, если путь уже нормализован', () => {
		const normalizedPath = normalize('/foo/bar')
		expect(normalizedPath).toBe('/foo/bar')
	})

	it('обрабатывает путь без начального слеша', () => {
		const normalizedPath = normalize('foo//bar/')
		expect(normalizedPath).toBe('foo/bar')
	})

	it('обрабатывает пустую строку', () => {
		const normalizedPath = normalize('')
		expect(normalizedPath).toBe('')
	})

	it('обрабатывает только слеши', () => {
		const normalizedPath = normalize('//////')
		expect(normalizedPath).toBe('/')
	})

	it('обрабатывает путь с вложенными папками и конечным слешом', () => {
		const normalizedPath = normalize('/a//b///c/')
		expect(normalizedPath).toBe('/a/b/c')
	})
})
