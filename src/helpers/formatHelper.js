import { rating as ratingConsts } from '../consts/raiting.js'

export const formatDuration = minutes => {
	const hours = Math.floor(minutes / 60)
	const mins = minutes % 60
	return `${hours}ч ${mins}м`
}

export const getRatingType = rating => {
	if (rating >= 8) {
		return ratingConsts.high
	}
	if (rating >= 5) {
		return ratingConsts.medium
	}
	return ratingConsts.low
}
