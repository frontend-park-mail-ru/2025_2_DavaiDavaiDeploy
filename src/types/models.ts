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

export interface ModelsError {
	message?: string;
}

export interface ModelsFilmFeedback {
	created_at: string;
	film_id: string;
	id: string;
	is_mine: boolean;
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

export interface ModelsFilmPage {
	actors: ModelsActor[];
	age_category: string;
	budget: number;
	country: string;
	cover: string;
	description: string;
	duration: number;
	genre: string;
	id: string;
	image1?: string;
	image2?: string;
	image3?: string;
	number_of_ratings: number;
	original_title?: string;
	poster: string;
	rating: number;
	short_description: string;
	slogan?: string;
	title: string;
	trailer_url: string;
	worldwide_fees: number;
	year: number;
	is_reviewed: boolean;
	user_rating?: number;
}

export interface ModelsGenre {
	created_at?: string;
	description: string;
	icon: string;
	id: string;
	title: string;
	updated_at?: string;
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

export interface ModelsSignInInput {
	login: string;
	password: string;
}

export interface ModelsSignUpInput {
	login: string;
	password: string;
}

export interface ModelsUser {
	avatar: string;
	created_at?: string;
	id: string;
	login: string;
	updated_at?: string;
	version: number;
	isAdmin: boolean;
}

export interface Feedback {
	created_at: string;
	id: string;
	is_mine: boolean;
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

type category = 'feature_request' | 'complaint' | 'question';
type status = 'open' | 'in_progress' | 'closed';

export interface TechResponse {
	id: string;
	user_id: string;
	description: string;
	category: category;
	status: status;
	created_at: string;
	updated_at: string;
}
