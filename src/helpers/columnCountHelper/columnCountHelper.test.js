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

	it('возвращает количество колонок для repeat() с фиксированным числом', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = 'repeat(3, 100px)'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(2)
	})

	it('возвращает количество колонок для auto-fit как количество слов', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(3)
	})

	it('возвращает количество колонок для auto-fill как количество слов', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(3)
	})

	it('возвращает количество колонок для сложных значений с разными единицами', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '100px 1fr minmax(200px, 1fr) 20%'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(5)
	})

	it('возвращает 1 для grid с одной колонкой', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '1fr'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(1)
	})

	it('возвращает 1, если grid-template-columns не задан', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(1)
	})

	it('игнорирует лишние пробелы между колонками', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '  100px    200px \t  1fr '

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(3)
	})

	it('возвращает 2 для двух колонок с простыми значениями', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '1fr 1fr'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(2)
	})

	it('работает с значениями в пикселях', () => {
		const grid = document.createElement('div')
		grid.style.display = 'grid'
		grid.style.gridTemplateColumns = '200px 300px 150px'

		const columnsCount = getGridColumnCount(grid)
		expect(columnsCount).toBe(3)
	})
})
