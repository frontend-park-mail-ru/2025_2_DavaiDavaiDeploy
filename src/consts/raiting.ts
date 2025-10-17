export const rating = Object.freeze({
	high: 'high',
	medium: 'medium',
	low: 'low',
} as const)

export type Rating = (typeof rating)[keyof typeof rating]
