/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GenFilmRatingInput {
	rating?: number;
}

export interface ModelsActor {
	birth_date: string;
	birth_place: string;
	created_at?: string;
	death_date?: string;
	height: number;
	id: string;
	marital_status: string;
	original_name?: string;
	photo: string;
	russian_name: string;
	updated_at?: string;
	zodiac_sign: string;
}

export interface ModelsActorPage {
	age: number;
	birth_date: string;
	birth_place: string;
	films_number: number;
	height: number;
	id: string;
	marital_status: string;
	original_name: string;
	photo: string;
	russian_name: string;
	zodiac_sign: string;
}

export interface ModelsChangePasswordInput {
	new_password: string;
	old_password: string;
}

export interface ModelsCompFilm {
	duration: number;
	genre: string;
	id: string;
	image: string;
	is_liked: boolean;
	rating: number;
	short_description: string;
	title: string;
	year: number;
}

export interface ModelsCompilation {
	created_at?: string;
	description: string;
	icon: string;
	id: string;
	title: string;
	updated_at?: string;
}

export interface ModelsFavFilm {
	duration: number;
	genre: string;
	id: string;
	image: string;
	rating: number;
	short_description: string;
	title: string;
	year: number;
}

export interface ModelsFilmFeedback {
	created_at: string;
	film_id: string;
	id: string;
	is_mine: boolean;
	new_film_rating: number;
	/**
	 * @min 1
	 * @max 10
	 */
	rating: number;
	text: string;
	title: string;
	updated_at: string;
	user_avatar: string;
	user_id: string;
	user_login: string;
}

export interface ModelsFilmFeedbackInput {
	/**
	 * @min 1
	 * @max 10
	 */
	rating: number;
	/**
	 * @minLength 1
	 * @maxLength 1000
	 */
	text: string;
	/**
	 * @minLength 1
	 * @maxLength 100
	 */
	title: string;
}

export interface ModelsFilmInCalendar {
	cover: string;
	id: string;
	is_liked: boolean;
	original_title?: string;
	release_date: string;
	short_description?: string;
	title: string;
}

export interface ModelsFilmPage {
	actors: ModelsActor[];
	age_category: string;
	budget: number;
	country: string;
	cover: string;
	description: string;
	duration: number;
	genre: string;
	genre_id: string;
	id: string;
	image1?: string;
	image2?: string;
	image3?: string;
	is_liked: boolean;
	is_reviewed: boolean;
	number_of_ratings: number;
	original_title?: string;
	poster: string;
	rating: number;
	short_description: string;
	slogan?: string;
	title: string;
	trailer_url: string;
	film_url: string;
	user_rating?: number;
	worldwide_fees: number;
	year: number;
	is_out: boolean;
}

export interface ModelsGenre {
	created_at?: string;
	description: string;
	icon: string;
	id: string;
	title: string;
	updated_at?: string;
}

export interface ModelsMainPageActor {
	id: string;
	photo: string;
	russian_name: string;
}

export interface ModelsMainPageFilm {
	cover: string;
	genre: string;
	id: string;
	rating: number;
	title: string;
	year: number;
}

export interface ModelsPromoFilm {
	created_at?: string;
	duration: number;
	genre: string;
	id: string;
	image: string;
	rating: number;
	short_description: string;
	title: string;
	updated_at?: string;
	year: number;
}

export interface ModelsSearchResponse {
	actors?: ModelsMainPageActor[];
	films?: ModelsMainPageFilm[];
	search_string?: string;
}

export interface ModelsSignInInput {
	login: string;
	password: string;
	user_code?: string;
}

export interface ModelsSignUpInput {
	login: string;
	password: string;
}

export interface ModelsUser {
	avatar: string;
	created_at?: string;
	has_2fa: boolean;
	id: string;
	login: string;
	updated_at?: string;
	version: number;
	is_foreign: boolean;
}

export interface ModelsVoiceSearchResponse {
	actors?: ModelsMainPageActor[];
	films?: ModelsMainPageFilm[];
	search_string?: string;
}

export interface ModelsOTPUser {
	twoFactorLoading: boolean;
	has_2fa: boolean;
	qrCode: string | null;
}

export interface ModelsNotification {
	id: uuid;
	title: string;
	text: string;
	created_at: time;
}

export interface ModelsVKIDUser {
	login: string;
	avatar: string;
	has_2fa: boolean;
}
