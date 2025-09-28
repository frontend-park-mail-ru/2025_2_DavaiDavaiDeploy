// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import { getGridColumnCount } from './columnCountHelper'

describe('getGridColumnCount', () => {
	it('возвращает количество колонок для grid с фиксированным числом колонок', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
		for (let i = 1; i <= 8; i++) {
			const item = document.createElement('div')
			grid.appendChild(item)
		}

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(4)
	})

	it('возвращает 1, если элемент не является grid', () => {
		const grid = document.createElement('div')
		grid.style.display = 'flex'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(1)
	})

	it('возвращает 0, если элемент отсутствует', () => {
		const columnsCount = getGridColumnCount(null)
		expect(columnsCount).toBe(0)
	})
})
