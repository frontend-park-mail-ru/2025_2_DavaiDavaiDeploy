import { rating as ratingConsts } from '../consts/raiting.js'

export const getRatingType = rating => {
	if (rating >= 8) {
		return ratingConsts.high
	}
	if (rating >= 5) {
		return ratingConsts.medium
	}
	return ratingConsts.low
}
