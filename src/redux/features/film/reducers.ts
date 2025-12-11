import { decode } from '@/helpers/decodeHelper/decodeHelper';
import { mergeUnique } from '@/helpers/mergeUniqueHelper/mergeUniqueHelper';
import type { Action } from '@/modules/redux/types/actions';
import type { Reducer } from '@/modules/redux/types/reducers';
import type { State } from '@/modules/redux/types/store';
import type {
	ModelsFilmFeedback,
	ModelsFilmPage,
	ModelsMainPageFilm,
} from '@/types/models';
import actionTypes from './actionTypes';

interface InitialState {
	filmLoading: boolean;
	feedbackLoading: boolean;
	film: ModelsFilmPage | null;
	feedbacks: ModelsFilmFeedback[] | null;
	filmError: string | null;
	feedbackError: string | null;
	userRating: number | null;
	userFeedback: ModelsFilmFeedback | null;
	leaveRatingError: string | null;
	leaveFeedbackError: string | null;
	addError: string | null;
	deleteError: string | null;
	is_out: boolean | null;
	similarFilms: ModelsMainPageFilm[] | null;
	similarLoading: boolean;
	similarError: string | null;
}

/**
 * Начальное состояние редьюсера фильмов.
 */
const initialState: InitialState = {
	filmLoading: false,
	feedbackLoading: false,
	film: null,
	feedbacks: null,
	filmError: null,
	feedbackError: null,
	userRating: null,
	userFeedback: null,
	leaveRatingError: null,
	leaveFeedbackError: null,
	addError: null,
	deleteError: null,
	is_out: null,
	similarFilms: null,
	similarLoading: false,
	similarError: null,
};

/**
 * Редьюсер для управления состоянием фильма и отзывов.
 */
const filmReducer: Reducer = (state = initialState, action: Action): State => {
	if (typeof action === 'function') {
		return state;
	}

	const { type, payload } = action;

	switch (type) {
		case actionTypes.FILM_LOADING:
			return {
				...state,
				filmLoading: true,
				filmError: null,
			};
		case actionTypes.FILM_LOADED:
			return {
				...state,
				filmLoading: false,
				film: {
					...payload.film,
					original_title: decode(payload.film.original_title),
					slogan: decode(payload.film.slogan),
				},
				userRating: payload.film.user_rating ? payload.film.user_rating : null,
			};
		case actionTypes.FILM_ERROR:
			return {
				...state,
				filmLoading: false,
				filmError: payload.error,
			};
		case actionTypes.CLEAR_FILM:
			return initialState;
		case actionTypes.FEEDBACK_LOADING:
			return {
				...state,
				feedbackLoading: true,
				feedbackError: null,
			};
		case actionTypes.FEEDBACK_LOADED:
			return {
				...state,
				feedbackLoading: false,
				feedbacks: (
					mergeUnique(
						state.feedbacks,
						payload.feedbacks,
					) as ModelsFilmFeedback[]
				).map((feedback) => ({
					...feedback,
					text: decode(feedback.text),
					title: decode(feedback.title),
				})),
				userFeedback: payload.feedbacks[0]?.is_mine
					? payload.feedbacks[0]
					: null,
			};
		case actionTypes.FEEDBACK_ERROR:
			return {
				...state,
				feedbackLoading: false,
				feedbackError: payload.error,
			};

		case actionTypes.CREATE_FEEDBACK:
			return {
				...state,
				userFeedback: payload.feedback,
			};

		case actionTypes.CREATE_RATING:
			return {
				...state,
				film: {
					...state.film,

					number_of_ratings:
						!state.userRating && payload.rating.rating
							? state.film.number_of_ratings + 1
							: state.film.number_of_ratings,

					rating: payload.rating.new_film_rating,
				},
				userRating: payload.rating.rating,
				userFeedback:
					payload.rating.title && payload.rating.text
						? (payload.rating as ModelsFilmFeedback)
						: null,
			};
		case actionTypes.ADD_TO_FAVORITES:
			return {
				...state,
				film: {
					...state.film,
					is_liked: true,
				},
			};
		case actionTypes.DELETE_FROM_FAVORITES:
			return {
				...state,
				film: {
					...state.film,
					is_liked: false,
				},
			};
		case actionTypes.ADD_TO_FAVORITES_ERROR:
			return {
				...state,
				addError: payload.error,
			};
		case actionTypes.DELETE_FROM_FAVORITES_ERROR:
			return {
				...state,
				deleteError: payload.error,
			};

		case actionTypes.SIMILAR_LOADING:
			return {
				...state,
				similarLoading: true,
				similarError: null,
			};
		case actionTypes.SIMILAR_LOADED:
			return {
				...state,
				similarLoading: false,
				similarFilms: payload.films,
				similarError: null,
			};
		case actionTypes.SIMILAR_ERROR:
			return {
				...state,
				similarLoading: false,
				similarError: payload.error,
				similarFilms: null,
			};
		default:
			return state;
	}
};

export default filmReducer;
