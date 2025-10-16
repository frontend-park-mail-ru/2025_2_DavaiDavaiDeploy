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

export interface ModelsError {
  message?: string;
}

export interface ModelsFilm {
  budget?: number;
  country?: string;
  createdAt?: string;
  duration?: number;
  fees?: number;
  genres?: ModelsGenre[];
  icon?: string;
  id?: string;
  premierDate?: string;
  rating?: number;
  title?: string;
  updatedAt?: string;
  year?: number;
}

export interface ModelsFilmProfessional {
  birthDate?: string;
  birthPlace?: string;
  createdAt?: string;
  deathDate?: string;
  description?: string;
  icon?: string;
  id?: string;
  isActive?: boolean;
  name?: string;
  nationality?: string;
  surname?: string;
  updatedAt?: string;
  wikipediaUrl?: string;
}

export interface ModelsGenre {
  createdAt?: string;
  description?: string;
  icon?: string;
  id?: string;
  title?: string;
  updatedAt?: string;
}

export interface ModelsSignInInput {
  login: string;
  password: string;
}

export interface ModelsSignUpInput {
  login?: string;
  password?: string;
}

export interface ModelsUser {
  avatar?: string;
  country?: string;
  createdAt?: string;
  favoriteActors?: ModelsFilmProfessional[];
  favoriteGenres?: ModelsGenre[];
  id?: string;
  login?: string;
  savedFilms?: ModelsFilm[];
  status?: "active" | "banned" | "deleted";
  updatedAt?: string;
}
