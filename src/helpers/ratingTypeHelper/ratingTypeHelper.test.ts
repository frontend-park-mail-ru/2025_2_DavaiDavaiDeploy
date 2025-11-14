import { describe, expect, it } from 'vitest';
import { getRatingType } from './ratingTypeHelper';

describe('getRatingType', () => {
	it('возвращает high если рейтинг больше 7', () => {
		const ratingType = getRatingType(9);
		expect(ratingType).toBe('high');
	});

	it('возвращает high для рейтинга 8', () => {
		const ratingType = getRatingType(8);
		expect(ratingType).toBe('high');
	});

	it('возвращает medium если рейтинг меньше или равен 7, но больше 4', () => {
		const ratingType = getRatingType(6);
		expect(ratingType).toBe('medium');
	});

	it('возвращает low если рейтинг меньше 4', () => {
		const ratingType = getRatingType(3);
		expect(ratingType).toBe('low');
	});

	it('возвращает medium для рейтинга 5', () => {
		const ratingType = getRatingType(5);
		expect(ratingType).toBe('medium');
	});

	it('возвращает null для рейтинга 0.1', () => {
		const ratingType = getRatingType(0);
		expect(ratingType).toBe(null);
	});

	it('возвращает low для рейтинга 1', () => {
		const ratingType = getRatingType(1);
		expect(ratingType).toBe('low');
	});

	it('возвращает null для рейтинга 0', () => {
		const ratingType = getRatingType(0);
		expect(ratingType).toBe(null);
	});

	it('возвращает high для рейтинга 7.9', () => {
		const ratingType = getRatingType(7.9);
		expect(ratingType).toBe('high');
	});

	it('возвращает high для рейтинга 10', () => {
		const ratingType = getRatingType(10);
		expect(ratingType).toBe('high');
	});
});
